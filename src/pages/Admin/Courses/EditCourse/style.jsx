import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 113px);
  padding: 0 50px 0 50px;

  /* background-color: pink; */
  & > h1 {
    text-align: center;
  }
`;
export const ShadowContainer = styled.div`
  /* box-shadow: 1px 1px 10px 0px rgb(0, 0, 0, 0.5); */
`;

export const ImgContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 20px 20px 0px 0px;
  position: relative;
  box-shadow: 1px 1px 10px 0px rgb(0, 0, 0, 0.5);
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px 20px 0px 0px;
  }
`;

export const TileContainer = styled.div`
  position: absolute;
  bottom: 20%;
  z-index: 9;
  margin: 0;

  & > h1 {
    margin: 0;
    font-size: 3.5rem;
    font-family: "PlantagenetCherokee";
    padding-right: 150px;
    padding-left: 20px;
    color: ${(props) => props.theme.colors.titleBlue};
  }
`;

export const NavbarContainer = styled.div`
  transform: translateY(-70px);
  border-radius: 0 0 45px 45px;
  box-shadow: 1px 1px 10px 0px rgb(0, 0, 0, 0.5);
`;

export const MenuContainer = styled.div`
  /* & > .p-tabview {
  } */

  & .p-tabview-nav {
    background-color: #ffffff9d;
    display: flex;
    justify-content: space-around;
    padding: 6px 5px 0 5px;
    /* border-radius: 20px 20px 0px 0px; */
  }
  & .p-tabview-nav-link {
    background-color: rgba(255, 255, 255, 0) !important;
    padding: 1.2rem 2rem 1.2rem 2rem !important;

    &:focus {
      box-shadow: none !important;
    }
  }
  /* Cambiar color de la opcion activa */
  & .p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
    color: ${(props) => props.theme.colors.titleBlue} !important;
  }
  /* Color de la barrita de seleccion */
  & .p-tabview .p-tabview-nav .p-tabview-ink-bar {
    background-color: ${(props) => props.theme.colors.titleBlue} !important;
  }

  & .p-tabview-panels {
    border-radius: 0 0 45px 45px;
  }
`;
