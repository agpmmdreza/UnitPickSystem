import Chip from "components/core/chip";
import {TChipColor} from "interfaces";
import {memo, useEffect, useState} from "react";

//? cell tha shows the status in three active,inactive and new status and gives color
type TChip = {
  text: string;
  color: TChipColor;
};
function DisplayStatusCell(props: any) {
  const [status, setStatus] = useState<TChip[]>([]);

  useEffect(() => {
    let temp: TChip[] = [];
    if (props.cell.row.original.is_active) {
      temp.push({ text: "Active", color: "green-light" });
    } else if (!props.cell.row.original?.is_active) {
      temp.push({ text: "Inactive", color: "error" });
    }
    if (props.cell.row.original.is_new) {
      temp.push({ text: "New", color: "primary-light" });
    }
    setStatus(temp);
  }, [props.cell.row.original]);

  return (
    <div className="w-100 d-flex flex-row">
      {status?.map((chip, index: number) => (
        <Chip text={chip.text} color={chip.color} key={chip.text + index} />
      ))}
    </div>
  );
}
export default memo(DisplayStatusCell);
