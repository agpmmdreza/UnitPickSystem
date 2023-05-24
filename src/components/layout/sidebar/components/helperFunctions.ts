import { LARGE } from "constants/breakpoints";

export function closeSidebar(setSideIn: (value: boolean) => void) {
  if (document.body.clientWidth <= LARGE) {
    //we are in mobile mode
    setSideIn(true);
    document.body.style.overflowY = "auto";
  }
}
