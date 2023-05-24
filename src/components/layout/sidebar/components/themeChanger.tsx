import classes from "./styles.module.scss";
import { ReactComponent as SunIcon } from "assets/icons/bulk/sun.svg";
import { ReactComponent as MoonIcon } from "assets/icons/bulk/moon.svg";
import { useContext, useEffect, useState } from "react";
import { useThemeMode } from "hooks/useThemeMode";
import { ThemeMode } from "components/provider/themeMode";
import { SidebarContext } from "..";
import clsx from "clsx";

/**
 * Defining DarkModeSwitch component properties
 */
interface DarkModeSwitchProps {
  dark: boolean;
  toggleTheme: () => void;
}

/**
 * Component for swtiching between dark & light modes
 */
export const DarkModeSwitch = ({ dark, toggleTheme }: DarkModeSwitchProps) => {
  return (
    <div
      data-testid="dark-light-switch"
      className={classes.darkModeSwitch}
      onClick={toggleTheme}
    >
      <div
        className={`${classes.switchOption} ${
          !dark && classes.switchOptionActive
        }`}
      >
        <SunIcon />
        <span>Light</span>
      </div>
      <div
        className={`${classes.switchOption} ${
          dark && classes.switchOptionActive
        }`}
      >
        <MoonIcon />
        <span>Dark</span>
      </div>
    </div>
  );
};

/**
 * Array for holding Theme Palettes and their related class names
 */
const colorPalettes = [
  {
    name: "royal_blue",
    class: "paletteBlue",
  },
  {
    name: "shamrock",
    class: "paletteShamrock",
  },
];

/**
 * Interface for ColorSwitch component properties
 */
interface ColorSwitchProps {
  paletteColor: string;
  changeColorPalette: (color: string) => void;
  isSidebarIn?: boolean;
}

/**
 * Component for switching between different palette colors
 */
const ColorSwitch = ({
  paletteColor,
  changeColorPalette,
  isSidebarIn,
}: ColorSwitchProps) => {
  return (
    <div
      data-testid="theme-colors"
      className={
        clsx(
          classes.paletteChanger,
          isSidebarIn && classes.paletterChangerWrapped
        )
        // isSidebarIn ? classes.paletterChangerWrapped : classes.paletteChanger
      }
    >
      {colorPalettes.map((color) => (
        <span
          data-testid={color.name}
          key={color.name}
          className={`${classes.colorOption} ${classes[color.class]} ${
            paletteColor === color.name && classes.colorOptionActive
          }`}
          onClick={() => changeColorPalette(color.name)}
        ></span>
      ))}
    </div>
  );
};

/**
 * Function for selecting and changing theme based on current palette color and dark mode
 * @param paletteColor - current palette state
 * @param isDark - is theme dark or light
 * @param swap - swap theme function from useThemeMode hook
 */
const selectTheme = (
  paletteColor: string,
  isDark: boolean,
  swap: (theme: ThemeMode) => void
) => {
  switch (true) {
    case paletteColor === colorPalettes[0].name && !isDark:
      swap(ThemeMode.Royal_Blue_Light);
      break;
    case paletteColor === colorPalettes[0].name && isDark:
      swap(ThemeMode.Royal_Blue_Dark);
      break;
    case paletteColor === colorPalettes[1].name && !isDark:
      swap(ThemeMode.Shamrock_Light);
      break;
    case paletteColor === colorPalettes[1].name && isDark:
      swap(ThemeMode.Shamrock_dark);
      break;
    case paletteColor === colorPalettes[2].name && !isDark:
      swap(ThemeMode.Gold_Light);
      break;
    case paletteColor === colorPalettes[2].name && isDark:
      swap(ThemeMode.Gold_Dark);
      break;
  }
};

/**
 * Container Component for DarkModeSwitch and ColorSwitch
 * components. paletteColor and dark (dark mode) states are
 * passed to related components.
 */
const ThemeChanger = () => {
  const { sideIn } = useContext(SidebarContext);
  const { swap, isDark, theme } = useThemeMode();
  // current palette color state
  const currentPaletteName = theme.substring(0, theme.lastIndexOf("_"));
  const [paletteColor, setPaletteColor] = useState(currentPaletteName);
  // whether current theme is in dark or light mode
  const [dark, setDark] = useState(isDark);

  /**
   * Function for changing palette color, used in
   * ColorSwitch component
   * @param color - new color to be set
   */
  const changeColorPalette = (color: string) => {
    setPaletteColor(color);
  };

  /**
   * Function for toggling dark and light mode, used in
   * DarkModeSwitch component
   */
  const toggleTheme = () => {
    setDark((pervState) => !pervState);
  };

  // changing theme when paletteColor or dark state
  // changes in children components
  useEffect(() => {
    selectTheme(paletteColor, dark, swap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paletteColor, dark]);

  return (
    <div data-testid="theme-changer" className={classes.themeChangerContainer}>
      <div>
        {!sideIn && <DarkModeSwitch dark={dark} toggleTheme={toggleTheme} />}
      </div>
      <div className="d-flex align-items-center">
        <ColorSwitch
          paletteColor={paletteColor}
          changeColorPalette={changeColorPalette}
          isSidebarIn={sideIn}
        />
      </div>
    </div>
  );
};

export default ThemeChanger;
