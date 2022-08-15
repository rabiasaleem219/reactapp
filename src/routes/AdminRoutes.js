import { Footer } from "components/common/Footer";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../pages/Admin";
import Advertisements from "../pages/Admin/advertisements";
import Blogs from "../pages/Admin/Blogs";
import Courses from "../pages/Admin/Courses";
import CreateCourse from "../pages/Admin/Courses/CreateCourse";
import EditCourse from "../pages/Admin/Courses/EditCourse";
import Emails from "../pages/Admin/Emails";
import Media from "../pages/Admin/Media";
import News from "../pages/Admin/News";
import Payments from "../pages/Admin/Payments";
import Stats from "../pages/Admin/Stats";
import Users from "../pages/Admin/Users";
import { PrivateAdminRoute } from "./PrivateAdminRoutes";
import { PrivateRoute } from "./PrivateRoute";
import Coupons from "pages/Admin/Coupons";
import Videos from "pages/Admin/Videos";
const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateAdminRoute>
              <Admin />
            </PrivateAdminRoute>
          }
        >
          {/* //* Seccion de Cursos */}
          <Route path="courses" element={<Courses />}></Route>
          <Route path="courses/create" element={<CreateCourse />} />
          <Route
            path="courses/edit/:courseTitle"
            element={<EditCourse />}
          ></Route>

          {/* //* Seccion de usuarios */}
          <Route path="users" element={<Users />} />
          {/* //* Seccion de pagos */}
          <Route path="payments" element={<Payments />} />
          {/* //* Seccion de estadisticas */}
          <Route path="stats" element={<Stats />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="emails" element={<Emails />} />
          <Route path="media" element={<Media />} />
          <Route path="advertisements" element={<Advertisements />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="news" element={<News />} />
          <Route path="videos" element={<Videos />} />
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;
