import styled from 'styled-components';

export const ProfileContainer = styled.div``;

export const ProfileInfo = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
  padding: 0 7rem;
  background-color: #f5f5f5;
  & > img {
    object-fit: cover;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
  }

  @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 1.5rem;
    height: 70px;
  }
  & > img {
    width: 170px;
    z-index: 9;
    border-radius: 50%;

    @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
      width: 80px;
    }
  }
`;

export const ProfileInfoText = styled.div`
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  & > h2 {
    family-font: 'helvetica';
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0;

    @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
      font-size: 1rem;
    }
  }

  & > p {
    margin: 0;
    family-font: 'helvetica';
    font-size: 0.9rem;
    font-weight: 200;
    color: ${(props) => props.theme.colors.gray};

    @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
      font-size: 0.8rem;
    }
  }
`;

export const ProfileDashboard = styled.div`
  background: ${(props) => props.theme.colors.lightGrayBackground};
  height: max-content;
  width: fill-available;
  width: webkit-fill-available;
  padding: 0 7rem;

  @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 1.5rem;
  }

  @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 1.5rem;
  }
`;

export const DashboardContainer = styled.div`
  width: fill-available;
  width: webkit-fill-available;
  padding-top: 3rem;
  & > h1 {
    font-size: 2.2rem;
    color: ${(props) => props.theme.colors.darkGray};
    font-weight: 500;
  }
`;
