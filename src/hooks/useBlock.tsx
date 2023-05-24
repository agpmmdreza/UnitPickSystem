import {useContext, useEffect} from "react";
import {NavigationContext} from "../pages/dashboard";
import {useHistory} from "react-router-dom";

export const useBlock = () => {
  const history = useHistory();
  const ctx = useContext(NavigationContext);
  useEffect(() => {
    ctx.block();
    history.listen(() => {
      ctx.unblock();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useUnblock = () => {
  const ctx = useContext(NavigationContext);
  return () => ctx.unblock();
};
