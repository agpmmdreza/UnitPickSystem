import classes from "./styles.module.scss";
import ThemeChanger from "./themeChanger";

export function SidebarFooter() {
  return (
    <div className={classes.sidebarFooter}>
      <ThemeChanger />
    </div>
  );
}
