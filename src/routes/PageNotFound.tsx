import React from "react";
import { Outlet } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div>
      PageNotFound
      <div style={{ display: "none" }}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
