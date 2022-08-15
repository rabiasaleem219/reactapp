import React from "react";
import { Link, Outlet } from "react-router-dom";
import Resize from "../../../../helpers/Resize";
import { Button } from "../../../common/Buttons/MainButton";
import { NavButton } from "../../../common/Navbar/styles";
import NavbarMobile from "../NavbarMobile";
import {
  CourseContainer,
  ImgContainer,
  NavbarContenedor,
  MenuContainer,
  ShadowContainer,
  OutletContainer,
} from "./styles";

const CourseNavbar = () => {
  const width = Resize();

  return (
    <CourseContainer>
      <ShadowContainer>
        <ImgContainer>
          <Button
            path="/course/classroom"
            text="Entrar a clase"
            padding="1.1rem 5rem"
            margin=" 7rem 0rem "
          />
          <NavbarContenedor>
            <MenuContainer>
              {width > 920 ? (
                <>
                  <NavButton color="#797979" fontSize="1.2rem" fontWeight="300">
                    <Link to="/course/description">Descripcion</Link>
                  </NavButton>
                  <NavButton color="#797979" fontSize="1.2rem" fontWeight="300">
                    <Link to="/course/teachers">Profesores</Link>
                  </NavButton>
                  <NavButton color="#797979" fontSize="1.2rem" fontWeight="300">
                    <Link to="/course/Curriculum">Curriculum</Link>
                  </NavButton>
                  <NavButton color="#797979" fontSize="1.2rem" fontWeight="300">
                    <Link to="/course/certificates">Certificados</Link>
                  </NavButton>
                  <NavButton color="#797979" fontSize="1.2rem" fontWeight="300">
                    <Link to="/course/comments">Comentarios</Link>
                  </NavButton>
                </>
              ) : (
                <NavbarMobile />
              )}
            </MenuContainer>
          </NavbarContenedor>
        </ImgContainer>
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </ShadowContainer>
    </CourseContainer>
  );
};

export default CourseNavbar;
