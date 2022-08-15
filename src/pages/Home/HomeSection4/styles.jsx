import styled from 'styled-components';

export const NewsTitle = styled.div`
  & h1 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    color: ${(props) => props.theme.colors.titleBlue};
    text-align: center;
  }
`;

export const NewsNavbar = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  & button {
    margin: 1rem 2rem;
    color: #000;
    font-weight: 300;
    font-size: 1.5rem;
    text-transform: capitalize;

    @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
      margin: 1rem 1rem;
      font-size: 1.2rem;
    }
  }
`;
