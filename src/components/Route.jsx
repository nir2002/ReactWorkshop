import React from "react";
import WithAuth from "../lib/Firebase/WithAuth";

function Route({ value, children }) {
  let curPath = window.location.pathname;
  if (curPath == value) {
    return <>{children}</>;
  }
  return null;
}

function AuthRoute({ value, children }) {
  let AuthChild = WithAuth(() => <>{children}</>);
  return (
    <Route value={value}>
      <AuthChild />
    </Route>
  );
}

export { AuthRoute };
export default Route;
