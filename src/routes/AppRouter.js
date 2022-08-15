import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import { startChecking } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import AdminRoutes from "./AdminRoutes";
import NotFound from "../pages/NotFound";
import ClientRoutes from "./ClientRoutes";
import { startFetch } from "../actions/courses";
import { startFetchCategories } from "actions/categories";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  useEffect(() => {
    const halfHour = 1800000;
    const interval = setInterval(() => {
      dispatch(startChecking());
    }, halfHour);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    dispatch(startFetch());
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(startFetchCategories());
  }, [dispatch]);

  if (checking) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<ClientRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
