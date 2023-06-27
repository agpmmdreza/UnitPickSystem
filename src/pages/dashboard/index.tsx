import Sidebar from "components/layout/sidebar";
import { buildRoute, getAuthRoutes } from "config/router";
import { useAuth, WithAuth } from "components/provider/auth";
import React, { Suspense, useRef, useState } from "react";
import { Prompt, Route, Switch } from "react-router";
import NotFound from "pages/404";
import Alert from "../../components/common/alert";

export interface INavigationContext {
  block: () => void;
  unblock: () => void;
}

export const NavigationContext = React.createContext<INavigationContext>({
  block: () => {},
  unblock: () => {},
});

export function PanelPages() {
  // console.log(getAuthRoutes());
  const [block, setBlock] = useState(false);

  const [tId, setTId] = useState<NodeJS.Timeout>();
  const [alertOpen, setAlertOpen] = useState(false);

  const { logOut } = useAuth();
  const timeoutId = useRef<NodeJS.Timeout>();

  return (
    <WithAuth>
      <NavigationContext.Provider
        value={{ block: () => setBlock(true), unblock: () => setBlock(false) }}
      >
        <Sidebar>
          <Suspense fallback={<div />}>
            <Switch>
              {getAuthRoutes().map(buildRoute)}
              <Route component={() => <NotFound />} />
            </Switch>
          </Suspense>

          <Alert
            open={alertOpen}
            setOpen={setAlertOpen}
            title={"Session Expiration"}
            text={
              "Your session is about to expire due to inactivity. You have been inactive for 15 minutes. To keep your session active, please interact with the page. If you do not approve this alert, you will be automatically logged out in 3 minutes. Thank you."
            }
            dismissible
            noCancel
            onApprove={() => {
              if (tId) clearTimeout(tId);
            }}
          />
        </Sidebar>
      </NavigationContext.Provider>
    </WithAuth>
  );
}
