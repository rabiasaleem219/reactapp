import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "../components/common/Header";

import Spinner from "../components/common/Spinner";
import Access from "../pages/Access";
import DashboardRoutes from "./DashboardRoutes";
import { PublicRoute } from "./PublicRoute";
import { Footer } from "components/common/Footer";

const Login = lazy(() => import("../pages/Access/Login"));
const Register = lazy(() => import("../pages/Access/Register"));

const ClientRoutes = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/*" element={<DashboardRoutes />} />
          <Route
            path="/access"
            element={
              <PublicRoute>
                <Access />
              </PublicRoute>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default ClientRoutes;
