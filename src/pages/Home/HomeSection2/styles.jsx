import styled from 'styled-components';

export const HomeCourseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5% 0;

  @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
    padding: 15% 0;
  }
`;

export const HomeCourseTitle = styled.div`
  & h1 {
    font-size: 1.8rem;
    margin-bottom: 5rem;
    text-transform: uppercase;
    color: ${(props) => props.theme.colors.titleBlue};
  }
`;

export const HomeCourseList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 78vw;
  height: fit-content;

  @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
    width: 85vw;
  }
`;
