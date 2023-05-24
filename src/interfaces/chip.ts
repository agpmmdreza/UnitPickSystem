type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

type TChipColor =
  | Color
  | "error"
  | "green-light"
  | "green-dark"
  | "primary-light"
  | "primary-dark"
  | "gray-light"
  | "gray-dark"
  // TODO: remove below types after refactor
  | "light-gray"
  | "dark-green"
  | "light-green"

  /** New Chip Colors */
  | "primary"
  | "danger"
  | "warning"
  | "success"
  | "random"

  /** Status Chips */
  | "active"
  | "inactive"
  | "pending"

  /** Doctor Schedule Types */
  | "scheduled time"
  | "off time"
  | "on demand time"

  /** HF Types */
  | "hospital"
  | "home"
  | "school"
  | "ambulance"
  | "kiosk"
  | "virtual_HF"
  | "airport"
  | "sport_center"
  | "retail"
  | "virtual HF"

  /** Robot Types */
  | "tv-robot"
  | "home-robot"
  | "hospital-robot"
  | "ambulance-robot"
  | "kiosk-robot"
  | "virtual-hf-robot"
  | "clinic-robot"
  | "hotel-robot";

export default TChipColor;
