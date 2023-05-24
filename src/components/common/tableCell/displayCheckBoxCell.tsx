import Checkbox from "components/core/checkbox";
import {memo, useState} from "react";

//? Cell that shows a checkbox in first column

interface IDisplayCheckBoxCellProps {
  value: boolean;
  onChange: (value?: boolean) => void;
}
function DisplayCheckBoxCell({ value, onChange }: IDisplayCheckBoxCellProps) {
  const [isLoading, setIsLoading] = useState(false);
  const onCheckBoxClicked = async () => {
    setIsLoading(true);
    await onChange();
    setIsLoading(false);
  };
  return (
    <div className="w-100 d-flex flex-row justify-content-center">
      <Checkbox
        checked={!!value}
        onChange={onCheckBoxClicked}
        rootInput={{ disabled: isLoading }}
      />
    </div>
  );
}
export default memo(DisplayCheckBoxCell);
