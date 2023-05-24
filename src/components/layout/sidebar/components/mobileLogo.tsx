import { SidebarBrand } from "./brand";
import classes from "./styles.module.scss";

export function SidebarMobileLogo() {
  return (
    <div className={classes.mobileVersionBrandContainer}>
      <div className="d-flex justify-content-center">
        <div className={classes.mobileLogo}></div>
      </div>
      <div className="d-flex justify-content-center">
        <SidebarBrand />
      </div>
    </div>
  );
}
