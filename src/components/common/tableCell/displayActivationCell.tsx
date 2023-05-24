import Switch from "components/core/switch";
import {memo, useState} from "react";

//? cell that shows if the cell is active or not
function DisplayActivationCell({
  cell,
  onChange,
}: {
  cell: any;
  onChange: (value: number) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  let active = cell.row.original.is_active;
  let id = cell.row.original.id;

  const onChangeClicked = async () => {
    setIsLoading(true);
    try {
      await onChange(id);
    } catch (error) {}
    setIsLoading(false);
  };
  return (
    <div className="w-100 d-flex flex-row justify-content-center">
      <Switch
        checked={active}
        disabled={isLoading}
        onChange={onChangeClicked}
      />
    </div>
  );
}
export default memo(DisplayActivationCell);
