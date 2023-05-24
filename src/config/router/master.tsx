import {RedirectToDashboard} from "components/common/redirectToDashboard";
import {TRoute} from "config/router";
import {DASHBOARD_GLOBAL_ROUTES} from "./globalDashboard";

const DOCTOR_ROUTES: TRoute = {
  path: "doctor",
  exact: true,
  component: RedirectToDashboard,
  inners: [...DASHBOARD_GLOBAL_ROUTES],
};

export default DOCTOR_ROUTES;
