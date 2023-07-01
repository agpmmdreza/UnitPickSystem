import "./styles/global.scss";
import "./styles/main.css";
import "react-toastify/dist/ReactToastify.css";

import { Route, Router, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { Suspense } from "react";
import { AuthProvider } from "components/provider/auth";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeModeProvider } from "components/provider/themeMode";
import { ToastContainer } from "react-toastify";
import { TOAST_PROPS } from "config/toast";
import { APIConfigurator } from "components/other/APIConfigurator";
import { PanelPages } from "pages/dashboard";
import { buildRoute, getGlobalRoutes, getSampleRoutes } from "config/router";
import NotFound from "pages/404";
import { createBrowserHistory } from "history";
import { Redirect } from "react-router";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const history = createBrowserHistory();

function App() {
  return (
    <ThemeModeProvider>
      <QueryClientProvider client={queryClient}>
        <Router history={history}>
          <AuthProvider>
            {/* <React.StrictMode> */}
            <Suspense fallback={<div />}>
              <Switch>
                <Route
                  path={"/"}
                  component={() => <Redirect to={"/login"} />}
                  exact
                />
                {getGlobalRoutes().map(buildRoute)}
                {getSampleRoutes().map(buildRoute)}
                <Route path={"/panel"} component={PanelPages} />
                <Route component={() => <NotFound />} />
              </Switch>
            </Suspense>
            {/* </React.StrictMode> */}
            <APIConfigurator />
          </AuthProvider>
        </Router>
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
        <ToastContainer {...TOAST_PROPS} />
      </QueryClientProvider>
    </ThemeModeProvider>
  );
}

export default App;
