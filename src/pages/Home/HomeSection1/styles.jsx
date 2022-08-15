import styled from "styled-components";

export const HomeHeroContainer = styled.section`
  margin-top: -2px;
  height: 700px;
  width: fill-available;
  width: -webkit-fill-available;
`;

export const HeroContainer = styled.div`
  height: 100%;
  display: flex;

  @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const HeroTextContainer = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 85px 8% 0 8%;
  justify-content: center;
  background: ${(props) => props.theme.gradient.blueGradientMain};
  background: -moz-linear-gradient(
    90deg,
    ${(props) => props.theme.gradient.blueGradient[0]},
    ${(props) => props.theme.gradient.blueGradient[1]},
    ${(props) => props.theme.gradient.blueGradient[2]}
  );
  background: -webkit-linear-gradient(
    90deg,
    ${(props) => props.theme.gradient.blueGradient[0]},
    ${(props) => props.theme.gradient.blueGradient[1]},
    ${(props) => props.theme.gradient.blueGradient[2]}
  );
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.gradient.blueGradient[0]},
    ${(props) => props.theme.gradient.blueGradient[1]},
    ${(props) => props.theme.gradient.blueGradient[2]}
  );
  width: 55%;

  @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
    padding: 85px 5% 0 5%;
    width: 100%;
  }

  @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
    padding: 7rem 1rem 3rem 1rem;
    width: fill-available;
    width: -webkit-fill-available;
  }
`;

export const HeroSeparator = styled.div`
  width: 40%;
  height: 2.5px;
  background: #fff;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const HeroTitle = styled.div`
  & h1 {
    font-size: 5rem;
    font-family: "PlantagenetCherokee";
    font-weight: unset;
    margin: 0;
    line-height: 1em;

    @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
      font-size: 4rem;
    }

    @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
      font-size: 3.5rem;
    }
  }
`;

export const HeroText = styled.div`
  & p {
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1.3em;

    @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
      font-size: 1.5rem;
    }

    @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
      font-size: 1.2rem;
      font-weight: 400;
    }
  }
`;

export const HeroForm = styled.div`
  display: flex;
  justify-content: space-around;
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 300;
    line-height: 1.3em;
    background-color: #fff;
    padding: 5px 2.3rem;
    border-radius: 35px;
    background: ${(props) => props.theme.colors.navBlueHover};

    @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
      padding: 0 1.5rem;
      font-size: 1rem;
    }

    @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
      padding: 0.6rem 1rem;
      font-size: 0.7rem;
    }
  }

  & input {
    width: 40%;
    border: none;
    background: none;
    font-size: 1.2rem;
    font-weight: 300;
    line-height: 1.3em;
    padding: 5px 2rem;
    border-radius: 35px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    margin-right: -15%;
    background: ${(props) => props.theme.colors.white};
    &::placeholder {
      color: #b8b5b5;
    }
    &:focus {
      outline: none;
    }

    @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
      font-size: 1rem;
      padding: 0 1.5rem;
    }

    @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
      font-size: 0.9rem;
      padding: 0.4rem 1rem;
    }
  }
  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
    border: none;
    background: none;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.3em;
    border-radius: 35px;
    padding: 13px 3rem;
    background: ${(props) => props.theme.colors.headerBlue};

    @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
      font-size: 1rem;
    }

    @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
      padding: 0.6rem 2.5rem;
    }
  }
`;

export const HeroImage = styled.div`
  width: 45%;
  height: 100%;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
    width: fill-available;
    width: -webkit-fill-available;
  }

  @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    height: 200px;
  }
`;
