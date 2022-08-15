import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: -webkit-fill-available;
  height: fill-available;
  padding: 0 4.5rem 0 4.5rem;
  & > h1 {
    text-align: center;
  }
  @media only screen and (min-width: 571px) and (max-width: 1000px) {
    padding: 0 5%;
  }
  @media only screen and (${(props) => props.theme.breakpoints.s}) {
    padding: 0;
  }
`;
export const ShadowContainer = styled.div``;

export const ImgContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 45px 45px 0px 0px;
  position: relative;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 40px 40px 0px 0px;
    position: absolute;
  }
  @media only screen and (${(props) => props.theme.breakpoints.s}) {
    border-radius: 20px 20px 0 0;
    & > img {
      border-radius: 20px 20px 0 0;
    }
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

  & > p {
    font-size: 1.5rem;
  }
`;

export const MenuContainer = styled.div`
  /* & > .p-tabview {
  } */

  & span {
    font-weight: 500;
  }

  & .p-tabview-nav {
    background-color: #ffffff9d;
    display: flex;
    justify-content: space-around;
    padding: 6px 5px 0 5px;
    font-weight: 500;
    @media only screen and (${(props) => props.theme.breakpoints.s}) {
      font-size: 0.8rem;
    }
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
    font-weight: 500 !important;
  }
  /* Color de la barrita de seleccion */
  & .p-tabview .p-tabview-nav .p-tabview-ink-bar {
    background-color: ${(props) => props.theme.colors.titleBlue} !important;
    @media only screen and (${(props) => props.theme.breakpoints.s}) {
    }
  }

  & .p-tabview-panels {
    border-radius: 0 0 45px 45px;
    min-height: 300px;
    max-height: ${(props) => props.maxHeight || "550px"};
    overflow-y: scroll;
    text-wrap: normal;
    padding: 2rem 3rem;
    @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
      padding: 2rem 0.5rem;
    }

    &::-webkit-scrollbar {
      width: 0px;

      &-track {
        background: #f8f8f8;
      }

      &-thumb {
        background: #5571b2;
        border-radius: 0.5rem;
      }
    }
  }
`;
