import {
  createContext,
  ProviderProps,
  useContext,
  useEffect,
  useState,
} from "react";

// Description:
// in this component we handle theme management and swap between the themes
// in the end we export ThemeMode & useThemeMode and destructor the swap(value: ThemeMode) and pass the right theme from ThemeMode to it
// and it will cause the theme switching

// it is a constant which hold dark-mode key for local storage
const STORAGE_THEME_MODE_KEY = "theme";

// it is an Enum which holds theme modes
export enum ThemeMode {
  Royal_Blue_Light = "royal_blue_light",
  Royal_Blue_Dark = "royal_blue_dark",
  Shamrock_Light = "shamrock_light",
  Shamrock_dark = "shamrock_dark",
  Gold_Light = "gold_light",
  Gold_Dark = "gold_dark",
}

// this interface determines our theme for web-app
interface IThemeModeData {
  theme: ThemeMode;
  isDark: boolean;
}

// this interface determines our provider's context structure which beside theme attribute,
// has a function named swap that changes theme-mode
interface IDarkModeContext extends IThemeModeData {
  swap: (value: ThemeMode) => void;
}

// this function determines that theme is light or dark
// further other components can get this determination from isDark state of context
const getIsDarkFromTheme = (theme: string) => {
  switch (theme) {
    case ThemeMode.Royal_Blue_Dark:
      return true;
    case ThemeMode.Shamrock_dark:
      return true;
    case ThemeMode.Gold_Dark:
      return true;
    default:
      return false;
  }
};

// this function gets default value from local-storage
// if there is none , it will return Royal_Blue_Light as default theme
function getDefaultValue(): IThemeModeData {
  const browserValue = localStorage.getItem(STORAGE_THEME_MODE_KEY);

  if (browserValue) {
    const theme = JSON.parse(browserValue);
    return {
      theme: theme,
      isDark: getIsDarkFromTheme(theme),
    };
  }

  return { theme: ThemeMode.Royal_Blue_Light, isDark: false };
}

// our theme context initialized here
const Context = createContext<IDarkModeContext>({
  ...getDefaultValue(),
  swap: (_) => {},
});

// this function apply theme mode to root element
const applyThemeMode = (value: ThemeMode) => {
  const root = document.getElementById("root")!;

  // in this switch we decide to assign right value for data-theme attribute of root element
  switch (value) {
    case ThemeMode.Royal_Blue_Light:
      return root.setAttribute("data-theme", ThemeMode.Royal_Blue_Light);
    case ThemeMode.Royal_Blue_Dark:
      return root.setAttribute("data-theme", ThemeMode.Royal_Blue_Dark);
    case ThemeMode.Shamrock_Light:
      return root.setAttribute("data-theme", ThemeMode.Shamrock_Light);
    case ThemeMode.Shamrock_dark:
      return root.setAttribute("data-theme", ThemeMode.Shamrock_dark);
    case ThemeMode.Gold_Light:
      return root.setAttribute("data-theme", ThemeMode.Gold_Light);
    case ThemeMode.Gold_Dark:
      return root.setAttribute("data-theme", ThemeMode.Gold_Dark);
  }
};

// our theme provider defined here it has the state of theme mode and when it changes save new value in local storage
export function ThemeModeProvider({
  children,
  ...props
}: Partial<ProviderProps<IThemeModeData>>) {
  const [data, setData] = useState<IThemeModeData>({
    ...getDefaultValue(),
    ...props,
  });

  // this state holds dark or light state
  // and components that changes based on dark or light mode can use this to notify the change
  const [isDark, setIsDark] = useState<boolean>(
    getIsDarkFromTheme(getDefaultValue().theme)
  );

  // in this useEffect we update new theme when it changes
  // and applies new theme to the root element
  useEffect(() => {
    localStorage.setItem(STORAGE_THEME_MODE_KEY, JSON.stringify(data.theme));
    applyThemeMode(data.theme);
  }, [data]);

  // this function swap the theme and update state of data which defined above and triggers the useEffect to apply changes
  const swap = (value: ThemeMode) => {
    setData((perv) => ({ ...perv, theme: value }));
    setIsDark(getIsDarkFromTheme(value));
    return;
  };

  return (
    <Context.Provider value={{ ...data, swap, isDark }}>
      {children}
    </Context.Provider>
  );
}

// we export the context via useThemeMode hook which gives us capability of global usage of this context
export function useThemeMode(): IDarkModeContext {
  const themeModeContext = useContext(Context);

  // we get the error if use useThemeMode hook outside of ThemeModeProvider
  if (!themeModeContext) {
    throw new Error("useThemeMode is only usable under ThemeModeProvider!");
  }
  // otherwise we get the context of themeProvider
  return { ...themeModeContext };
}
