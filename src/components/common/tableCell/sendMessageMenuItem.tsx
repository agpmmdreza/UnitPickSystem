import DropdownItem from "components/core/dropdownItem";
import {useHistory} from "react-router";

//? cell that handles the deletion of cell

export interface ISendMessageMenuItemProps {
  userId?: number;
  className?: string;
}
export function SendMessageMenuItem({
  className,
  userId,
}: ISendMessageMenuItemProps) {
  const history = useHistory();
  return (
    <>
      {/* <div className={clsx(["my-1"])}></div> */}
      <DropdownItem
        className={className}
        onClick={() => {
          history.push(`messages/${userId}`);
        }}
      >
        <span>Send Message</span>
      </DropdownItem>
    </>
  );
}
