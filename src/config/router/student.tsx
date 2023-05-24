import {RedirectToDashboard} from "components/common/redirectToDashboard";
import {TRoute} from "config/router";
import {DASHBOARD_GLOBAL_ROUTES} from "./globalDashboard";

const PATIENT_ROUTES: TRoute = {
  path: "patient",
  exact: true,
  component: RedirectToDashboard,
  inners: [...DASHBOARD_GLOBAL_ROUTES],
};

export default PATIENT_ROUTES;
