import React from "react";
import { Outlet } from "react-router-dom";
import NavLeft from "../Components/NavLeft.tsx";
import Analytics from "./Analytics.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/dashboard/analytics");
  // }, []);
  return (
    <div>
      <NavLeft>
        <Outlet></Outlet>
      </NavLeft>
    </div>
  );
}
