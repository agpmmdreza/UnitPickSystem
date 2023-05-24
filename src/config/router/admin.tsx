import {RedirectToDashboard} from "components/common/redirectToDashboard";
import {lazy} from "react";
import {TRoute} from "config/router";
import {DASHBOARD_GLOBAL_ROUTES} from "./globalDashboard";

// const ResetPassword = lazy(
//   () =>
//     import(
//       "pages/dashboard/superAdmin/localAdmin/staffManagement/resetPassword"
//     )
// );

const SUPER_ADMIN_ROUTES: TRoute = {
  path: "admin",
  exact: true,
  component: RedirectToDashboard,
  inners: [
    {
      path: "dashboard",
      exact: true,
      component: lazy(() => import("pages/dashboard/admin/home")),
    },
    {
      path: "users",
      exact: true,
      component: lazy(() => import("pages/dashboard/admin/users")),
      inners: [
        {
          exact: true,
          path: "create",
          component: lazy(
            () => import("pages/dashboard/admin/users/components/addUser")
          ),
        },
      ],
    },

    ...DASHBOARD_GLOBAL_ROUTES,
  ],
};

export default SUPER_ADMIN_ROUTES;
