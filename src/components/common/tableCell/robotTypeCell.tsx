import Chip from "components/core/chip";
import {TChipColor} from "interfaces";

//? a cell that defines robot type by name and gives the color
export const RobotTypeChip = ({ value }: { value: string | null }) => {
  // let color: TChipColor = "gray-light";
  // switch (value?.toLowerCase().trim()) {
  //   case "healthcare facility assigned robot":
  //     color = "primary-dark";
  //     break;
  //   case "home assigned robot":
  //     color = "green-light";
  //     break;
  // }

  return (
    <div className="w-100 d-flex flex-row justify-content-center">
      {!!value ? <Chip color={value as TChipColor} text={value} /> : null}
    </div>
  );
};
