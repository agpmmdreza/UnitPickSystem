import {TRoute} from "config/router";
import {lazy} from "react";

export const DASHBOARD_GLOBAL_ROUTES: TRoute[] = [
  {
    path: "profile-management/view-profile",
    exact: true,
    component: lazy(() => import("pages/globalPages/profileManagement/index")),
  },
  {
    path: "profile-management/edit",
    exact: true,
    component: lazy(() => import("pages/globalPages/profileManagement/index")),
  },

  {
    path: "change-password",
    exact: true,
    component: lazy(() => import("pages/globalPages/changePassword/index")),
  },
];
