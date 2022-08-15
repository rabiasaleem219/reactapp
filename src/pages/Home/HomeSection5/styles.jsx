import styled from 'styled-components';

export const BlogContainer = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.lightBlueBackground};
  height: max-content;
`;

export const BlogTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;

  @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
    width: fit-content;
    padding: 0 1.5rem;
  }
  & h1 {
    font-size: 5.8rem;
    color: ${(props) => props.theme.colors.black};
    font-family: 'PlantagenetCherokee';
    padding-left: 20%;
    font-weight: 500;
    line-height: 5.5rem;
    margin-bottom: 0;

    @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
      font-size: 3.5rem;
      padding-left: 0;
      line-height: 4rem;
    }

    @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
      font-size: 2.5rem;
      line-height: 3rem;
    }
  }

  & p {
    font-size: 1.5rem;
    color: ${(props) => props.theme.colors.darkGray};
    padding-left: 20%;

    @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
      font-size: 1.2rem;
      padding-left: 0;
    }

    @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
      font-size: 1rem;
    }
  }
`;

export const BlogContent = styled.div``;
