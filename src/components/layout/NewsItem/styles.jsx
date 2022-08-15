import styled from 'styled-components';

export const NewsContainer = styled.div`
  display: flex;
  margin-bottom: 5rem;

  @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

export const NewsProfileImage = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    width: 60%;
  }
`;

export const NewsContent = styled.div`
  width: 60%;
  padding-right: 10rem;

  @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
    width: fit-content;
    padding: 0 1.5rem;
    width: fill-available;
    width: -webkit-fill-available;
  }
`;

export const NewsTitle = styled.div`
  & > h1 {
    font-size: 2.7rem;
    font-weight: 400;
    margin-bottom: 0;
    font-family: 'PlantagenetCherokee';
    color: ${({ theme }) => theme.colors.black};

    @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
      font-size: 2rem;
    }
  }
`;

export const NewsSubtitle = styled.div`
  & > h5 {
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
    color: ${({ theme }) => theme.colors.gray};
  }
`;

export const NewsText = styled.div`
  margin-top: 1.5rem;
  & > p {
    font-size: 1.5rem;
    font-weight: 300;
    font-family: 'Roboto';
    margin: 0;
    color: ${({ theme }) => theme.colors.darkGray};

    @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
      font-size: 1.2rem;
    }
  }
`;

export const NewsButton = styled.button``;
