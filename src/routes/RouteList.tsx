import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import { Home } from "../pages/Home";

// Route configuration
interface RouteItem {
  path: string;
  component: React.ComponentType;
  // protected?: boolean;
}

const routeList: RouteItem[] = [{ path: "/", component: Home }];

export const RouteList: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routeList.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
