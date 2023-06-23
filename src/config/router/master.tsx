import { RedirectToDashboard } from "components/common/redirectToDashboard";
import { TRoute } from "config/router";
import { lazy } from "react";
import { DASHBOARD_GLOBAL_ROUTES } from "./globalDashboard";

const DOCTOR_ROUTES: TRoute = {
  path: "master",
  exact: true,
  component: RedirectToDashboard,
  inners: [
    {
      path: "dashboard",
      exact: true,
      component: lazy(() => import("pages/dashboard/admin/home")),
    },

    {
      path: "unit-pick-time",
      exact: true,
      component: lazy(() => import("pages/dashboard/admin/unitPickTime")),
      inners: [
        {
          exact: true,
          path: "add",
          component: lazy(
            () => import("pages/dashboard/admin/unitPickTime/addPickTime")
          ),
        },
        {
          exact: true,
          path: ":id",
          component: lazy(
            () => import("pages/dashboard/admin/users/components/editUser")
          ),
        },
      ],
    },

    {
      path: "time-table-bells",
      exact: true,
      component: lazy(() => import("pages/dashboard/master/timeTableBells")),
      inners: [
        {
          exact: true,
          path: "create",
          component: lazy(
            () =>
              import(
                "pages/dashboard/master/timeTableBells/components/addTimeTableBell"
              )
          ),
        },
        {
          exact: true,
          path: ":id",
          component: lazy(
            () =>
              import(
                "pages/dashboard/master/timeTableBells/components/editTimeTableBell"
              )
          ),
        },
      ],
    },
    {
      path: "courses",
      exact: true,
      component: lazy(() => import("pages/dashboard/admin/courses")),
      inners: [
        {
          exact: true,
          path: "create",
          component: lazy(
            () => import("pages/dashboard/admin/courses/components/addCourse")
          ),
        },
        {
          exact: true,
          path: ":id",
          component: lazy(
            () => import("pages/dashboard/admin/courses/components/editCourse")
          ),
        },
      ],
    },
    ...DASHBOARD_GLOBAL_ROUTES,
  ],
};

export default DOCTOR_ROUTES;
