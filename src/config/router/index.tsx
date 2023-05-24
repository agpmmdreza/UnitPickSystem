import {Route, RouteProps} from "react-router-dom";
import SUPER_ADMIN_ROUTES from "config/router/admin";
import DOCTOR_ROUTES from "config/router/master";
import GLOBAL_ROUTES from "config/router/global";
import PATIENT_ROUTES from "./student";

type TRoute = RouteProps & {
  inners?: TRoute[];
};

interface IAllRoutesResult {
  sampleRoutes: TRoute[];
  authRoutes: TRoute[];
  globalRoutes: TRoute[];
}

const PANEL_ROUTES: TRoute[] = [
  SUPER_ADMIN_ROUTES,
  DOCTOR_ROUTES,
  PATIENT_ROUTES,
];

function transformRoutes(routes: TRoute[], parentPath?: string): RouteProps[] {
  let _routes: RouteProps[] = [];
  routes.forEach((_route) => {
    const currentPath = `${parentPath || ""}/${_route.path}`;
    const { inners: _inners, ..._routeProps } = _route;
    _routes.push({ ..._routeProps, path: currentPath });

    if (_inners) {
      const _innerRoutes = transformRoutes(_inners, currentPath);
      _routes = _routes.concat(_innerRoutes);
    }
  });

  return _routes;
}

function getSampleRoutes(): RouteProps[] {
  if (process.env.NODE_ENV === "production") {
    return [];
  }

  return transformRoutes([]);
}

function getAuthRoutes(): RouteProps[] {
  return transformRoutes(PANEL_ROUTES, "/panel");
}

function getGlobalRoutes(): RouteProps[] {
  return transformRoutes(GLOBAL_ROUTES);
}

function getAllRoutes(): IAllRoutesResult {
  return {
    sampleRoutes: getSampleRoutes(),
    globalRoutes: getGlobalRoutes(),
    authRoutes: getAuthRoutes(),
  };
}

function buildRoute({ path, ...routeProps }: TRoute): JSX.Element {
  return <Route key={String(path)} path={path} {...routeProps} />;
}

export type { TRoute };
export {
  transformRoutes,
  buildRoute,
  getAuthRoutes,
  getGlobalRoutes,
  getSampleRoutes,
  getAllRoutes,
};
