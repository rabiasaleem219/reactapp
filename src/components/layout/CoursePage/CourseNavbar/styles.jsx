import styled from "styled-components";
import img from "../../../../assets/images/course-image.png";

export const CourseContainer = styled.div`
  background-color: #f8f8f8;
`;

export const ShadowContainer = styled.div`
  padding: 0px 92px 0px 92px;
  @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    padding: 0px 0px 0px 0px;
  }
`;

export const ImgContainer = styled.div`
  background-image: url(${img});
  background-size: 100% 150%;
  object-fit: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 400px;
  width: 100%;
  margin: 0 auto;
  transform: translateY(-15%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50px 50px 0px 0px;
  box-shadow: 1px 1px 10px 0px rgb(0, 0, 0, 0.5);
`;

export const NavbarContenedor = styled.div`
  background-color: #ffffff9d;
  padding: 60px 0px 60px 0px;
  width: 100%;
  height: 0px;
  display: flex;
  align-items: center;
`;

export const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

export const OutletContainer = styled.div`
  margin-top: -69px;
  box-shadow: 0px 3px 99px rgba(4, 39, 195, 0.09);
  border-radius: 0px 0px 50px 50px;
`;
