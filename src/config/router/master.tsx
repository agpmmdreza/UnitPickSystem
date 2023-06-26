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
      path: "announcements",
      exact: true,
      component: lazy(() => import("pages/dashboard/master/announcements")),
      inners: [
        {
          exact: true,
          path: "create",
          component: lazy(
            () =>
              import(
                "pages/dashboard/master/announcements/components/addAnnouncements"
              )
          ),
        },
        {
          exact: true,
          path: ":id",
          component: lazy(
            () =>
              import(
                "pages/dashboard/master/announcements/components/editAnnouncements"
              )
          ),
        },
      ],
    },
    {
      path: "courses",
      exact: true,
      component: lazy(() => import("pages/dashboard/master/courses")),
      inners: [
        {
          exact: true,
          path: "create",
          component: lazy(
            () => import("pages/dashboard/master/courses/components/addCourse")
          ),
        },
        {
          exact: true,
          path: ":id",
          component: lazy(
            () => import("pages/dashboard/master/courses/components/editCourse")
          ),
        },
      ],
    },
    {
      path: "submit-grade",
      exact: true,
      component: lazy(() => import("pages/dashboard/master/grades")),
      inners: [
        {
          exact: true,
          path: ":id/create",
          component: lazy(
            () =>
              import("pages/dashboard/master/grades/components/submitGrades")
          ),
        },
      ],
    },
    ...DASHBOARD_GLOBAL_ROUTES,
  ],
};

export default DOCTOR_ROUTES;
