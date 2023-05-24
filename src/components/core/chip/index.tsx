import {HTMLAttributes, ReactNode} from "react";
import classes from "./styles.module.scss";
import clsx from "clsx";
import {TChipColor} from "interfaces";

/**
 * Generate a random dark color
 * @returns string in rgb format
 */
const getRandomDarkColor = () => {
  const red = Math.floor(Math.random() * 200);
  const green = Math.floor(Math.random() * 200);
  const blue = Math.floor(Math.random() * 200);
  return `${red},${green},${blue}`;
};

/**
 * Function for generating a random style (bg color & text
 * color) for chip with 'random' data-color
 * @returns generated random style
 */
const getRandomChipStyle = () => {
  const randomColor = getRandomDarkColor();
  const randomBgColor = `rgba(${randomColor},0.1)`;
  const randomTextColor = `rgb(${randomColor})`;
  return { backgroundColor: randomBgColor, color: randomTextColor };
};

/**
 * Interface for Chip component properties
 */
interface IChipProps extends HTMLAttributes<HTMLElement> {
  text: string;
  color: TChipColor;
  className?: string;
  icon?: ReactNode;
}

const hex2rgba = (hex: string, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

/**
 * Chip component with text & color based on passed props
 */
const Chip = ({ text, color, className, icon, ...rest }: IChipProps) => {
  return (
    <div
      data-testid="test-chip"
      className={clsx([classes.chip, className])}
      data-color={color?.toLowerCase()?.replace(" ", "-")}
      // If color was random, generate random style
      {...(color === "random" && {
        style: getRandomChipStyle(),
      })}
      {...(color.startsWith("#") && {
        style: { backgroundColor: hex2rgba(color, 0.1), color },
      })}
      {...rest}
    >
      {/* <div className={classes.badge} data-color={color} /> */}
      <span className="chip-text" data-color={color}>
        {text}
      </span>
      {icon && <span className="ms-2">{icon}</span>}
    </div>
  );
};

Chip.defaultProps = {
  color: "random",
};

export default Chip;
