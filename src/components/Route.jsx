import React from "react";

function Route({ value, children }) {
  let curPath = window.location.pathname;
  console.log("C",curPath)
  if (curPath == value) {
    return <>{children}</>;
  }
  return null;
}

export default Route;
