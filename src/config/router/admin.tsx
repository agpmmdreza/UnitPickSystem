import { RedirectToDashboard } from "components/common/redirectToDashboard";
import { lazy } from "react";
import { TRoute } from "config/router";
import { DASHBOARD_GLOBAL_ROUTES } from "./globalDashboard";

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
      path: "majors",
      exact: true,
      component: lazy(() => import("pages/dashboard/admin/majors")),
      inners: [
        {
          exact: true,
          path: "create",
          component: lazy(
            () => import("pages/dashboard/admin/majors/components/addMajor")
          ),
        },
        {
          exact: true,
          path: ":id",
          component: lazy(
            () => import("pages/dashboard/admin/majors/components/editMajor")
          ),
        },
      ],
    },
    {
      path: "unit-pick-time",
      exact: true,
      component: lazy(() => import("pages/dashboard/admin/unitPickTime")),
      inners: [
        {
          exact: true,
          path: "create",
          component: lazy(
            () => import("pages/dashboard/admin/unitPickTime/addPickTime")
          ),
        },
        {
          exact: true,
          path: ":id",
          component: lazy(
            () =>
              import(
                "pages/dashboard/admin/unitPickTime/addPickTime/editUnitPickTime"
              )
          ),
        },
      ],
    },
    {
      path: "days",
      exact: true,
      component: lazy(() => import("pages/dashboard/admin/days")),
      inners: [
        {
          exact: true,
          path: "create",
          component: lazy(
            () => import("pages/dashboard/admin/days/components/addDay")
          ),
        },
        {
          exact: true,
          path: ":id",
          component: lazy(
            () => import("pages/dashboard/admin/days/components/editDay")
          ),
        },
      ],
    },
    {
      path: "bells",
      exact: true,
      component: lazy(() => import("pages/dashboard/admin/bells")),
      inners: [
        {
          exact: true,
          path: "create",
          component: lazy(
            () => import("pages/dashboard/admin/bells/components/addBell")
          ),
        },
        {
          exact: true,
          path: ":id",
          component: lazy(
            () => import("pages/dashboard/admin/bells/components/editBell")
          ),
        },
      ],
    },
    {
      path: "time-table-bells",
      exact: true,
      component: lazy(() => import("pages/dashboard/admin/timeTableBells")),
      inners: [
        {
          exact: true,
          path: "create",
          component: lazy(
            () =>
              import(
                "pages/dashboard/admin/timeTableBells/components/addTimeTableBell"
              )
          ),
        },
        {
          exact: true,
          path: ":id",
          component: lazy(
            () =>
              import(
                "pages/dashboard/admin/timeTableBells/components/editTimeTableBell"
              )
          ),
        },
      ],
    },
    {
      path: "time-table",
      exact: true,
      component: lazy(() => import("pages/dashboard/admin/timeTable")),
      inners: [
        {
          exact: true,
          path: "create",
          component: lazy(
            () =>
              import("pages/dashboard/admin/timeTable/components/addTimeTable")
          ),
        },
        // {
        //   exact: true,
        //   path: ":id",
        //   component: lazy(
        //     () =>
        //       import(
        //         "pages/dashboard/admin/timeTable/components/editTimeTableBell"
        //       )
        //   ),
        // },
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

export default SUPER_ADMIN_ROUTES;
