import { Redirect, useLocation } from "react-router";

//? Redirect to dashboard
export function RedirectToDashboard() {
  const location = useLocation();

  return <Redirect to={`${location.pathname}dashboard`} />;
}
