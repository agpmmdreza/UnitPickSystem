import classes from "./styles.module.scss";

interface IMenuItemProps {
  id: string;
  onClick: (id: string) => void;
  selected: false;
  children: JSX.Element[] | JSX.Element;
}
// items for menu component
function MenuItem({ onClick, id, children }: IMenuItemProps) {
  return (
    <div className={classes.menuItem} onClick={() => onClick(id)}>
      {children}
    </div>
  );
}

MenuItem.defaultProps = {
  onClick: () => {},
  selected: false,
};

export default MenuItem;
