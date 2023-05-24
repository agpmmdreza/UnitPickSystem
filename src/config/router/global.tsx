import {TRoute} from "config/router";
import PasswordRecoveryPage from "pages/login/passwordRecovery";
import LoginPage from "pages/login/login";

// please do not change this import to lazy.
// we do it for ux reasons.
const GLOBAL_ROUTES: TRoute[] = [
  {
    path: "forget-password",
    component: PasswordRecoveryPage,
    exact: true,
  },
  {
    path: "login",
    component: LoginPage,
    exact: true,
  },
];

export default GLOBAL_ROUTES;
