import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme.colors.headerBlue};
  width: fill-available;
  width: -webkit-fill-available;
  height: 85px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0px 2rem;
  box-sizing: border-box;

  @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
    height: 80px;
    padding: 0px 1rem;
  }

  @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
    height: 70px;
    padding: 0px 0.5rem;
  }
`;
export const Container = styled.div`
  color: ${(props) => props.theme.colors.white};
  font-size: 13px;
  height: 50%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;

  @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
    font-size: 11px;
  }

  @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
    font-size: 7px;
  }
`;

export const Container1 = styled(Container)`
  width: 20%;
  & > img {
    width: 12rem;
    height: auto;

    @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
      width: 8rem;
    }

    @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
      width: 6rem;
    }
    @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
    }
  }
`;

export const Container2 = styled(Container)`
  border-left: 2px solid ${(props) => props.theme.colors.white};
`;
export const Container3 = styled(Container)`
  border-left: 2px solid ${(props) => props.theme.colors.white};
`;
export const Container4 = styled(Container)`
  width: 20%;
  & > img {
    width: 7rem;
    height: auto;

    @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
      width: 5rem;
    }

    @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
      width: 3rem;
    }
  }
`;
