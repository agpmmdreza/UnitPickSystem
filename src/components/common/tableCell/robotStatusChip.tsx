import Chip from "components/core/chip";
import {TChipColor} from "interfaces";

const RobotStatusChip = ({
  value,
}: {
  value: { value: boolean; label: string } | null;
}) => {
  let color: TChipColor = "gray-light";
  switch (value?.value) {
    case true:
      color = "green-light";
      break;
    case false:
      color = "error";
      break;
  }

  return (
    <div className="w-100 d-flex flex-row justify-content-center">
      {!!value ? <Chip color={color} text={String(value?.label)} /> : null}
    </div>
  );
};

export { RobotStatusChip };
