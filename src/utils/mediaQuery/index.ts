import {LARGE, MEDIUM, SMALL, X_LARGE, XX_LARGE} from "constants/breakpoints";

enum Breakpoints {
  sm = SMALL,
  md = MEDIUM,
  lg = LARGE,
  xl = X_LARGE,
  xxl = XX_LARGE,
}

export type IMediaSize = keyof typeof Breakpoints;

class MediaQuery {
  static between(min: IMediaSize, max: IMediaSize) {
    return `@media (min-width: ${min}) and (max-width: ${max})`;
  }

  static up(min: IMediaSize) {
    return `@media (min-width: ${min})`;
  }

  static down(max: IMediaSize) {
    return `@media (max-width: ${max})`;
  }

  static only(size: IMediaSize) {
    switch (size) {
      case "sm":
        return `@media (min-width: ${Breakpoints.sm}) and (max-width: ${Breakpoints.md}`;
      case "md":
        return `@media (min-width: ${Breakpoints.md}) and (max-width: ${Breakpoints.lg}`;
      case "lg":
        return `@media (min-width: ${Breakpoints.lg}) and (max-width: ${Breakpoints.xl}`;
      case "xl":
        return `@media (min-width: ${Breakpoints.xl}) and (max-width: ${Breakpoints.xxl}`;
      case "xxl":
        return `@media (min-width: ${Breakpoints.xxl})`;
      default:
        return ``;
    }
  }
}

export default MediaQuery;
