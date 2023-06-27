import { RedirectToDashboard } from "components/common/redirectToDashboard";
import { TRoute } from "config/router";
import { lazy } from "react";
import { DASHBOARD_GLOBAL_ROUTES } from "./globalDashboard";

const PATIENT_ROUTES: TRoute = {
  path: "student",
  exact: true,
  component: RedirectToDashboard,
  inners: [
    {
      path: "dashboard",
      exact: true,
      component: lazy(() => import("pages/dashboard/student/home")),
    },
    {
      path: "units",
      exact: true,
      inners: [
        {
          exact: true,
          path: "add",
          component: lazy(
            () => import("pages/dashboard/student/units/components/addUnit")
          ),
        },
        {
          exact: true,
          path: "chosen",
          component: lazy(() => import("pages/dashboard/student/units")),
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
            () => import("pages/dashboard/admin/users/components/editUser")
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
            () => import("pages/dashboard/admin/users/components/editUser")
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
      path: "report",
      exact: true,
      component: lazy(() => import("pages/dashboard/student/reports")),
      inners: [],
    },
    {
      path: "announcements",
      exact: true,
      component: lazy(() => import("pages/dashboard/student/announcements")),
      inners: [
        {
          exact: true,
          path: "create",
          component: lazy(
            () =>
              import(
                "pages/dashboard/student/announcements/components/addAnnouncements"
              )
          ),
        },
        {
          exact: true,
          path: ":id",
          component: lazy(
            () =>
              import(
                "pages/dashboard/student/announcements/components/editAnnouncements"
              )
          ),
        },
      ],
    },
    ...DASHBOARD_GLOBAL_ROUTES,
  ],
};

export default PATIENT_ROUTES;
