import Chip from "components/core/chip";
import {TChipColor} from "interfaces";

const UserStatusTypeCell = ({ value }: { value: string | null }) => {
  let color: TChipColor = "error";
  switch (value?.toLowerCase().trim()) {
    case "denied":
      color = "error";
      break;
    case "pending":
      color = "pending";
      break;
    case "active":
      color = "active";
      break;
  }
  return (
    <div className="w-100 d-flex flex-row justify-content-center">
      {!!value && <Chip color={color} text={value} />}
    </div>
  );
};

export default UserStatusTypeCell;
