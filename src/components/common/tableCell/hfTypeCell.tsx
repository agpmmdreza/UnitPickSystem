import Chip from "components/core/chip";
import {TChipColor} from "interfaces";

//? a cell that shows health facility type and gives specific color

export function HFTypeCell({ value }: { value: string | null }) {
  // let color: TChipColor = "error";
  // switch (value?.toLowerCase().trim()) {
  //   case "hospital":
  //     color = "primary-light";
  //     break;
  //   case "clinic":
  //     color = "gray-dark";
  //     break;
  //   case "home office":
  //     color = "gray-light";
  //     break;
  // }

  return (
    <div className="w-100 d-flex flex-row justify-content-center">
      {!!value ? (
        <Chip color={value?.replace(" ", "_") as TChipColor} text={value} />
      ) : (
        "- - -"
      )}
    </div>
  );
}
