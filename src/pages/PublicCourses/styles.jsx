import styled from "styled-components";

export const CoursesContainer = styled.div`
  background-color: ${(props) => props.theme.colors.lightGrayBackground};
  min-height: calc(100vh - 110px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleContainer = styled.div`
  width: 100%;
  & > h1 {
    font-size: 1.8rem;
    margin: 4rem 0;
    text-transform: uppercase;
    color: #5373b2;
    text-align: center;
  }
`;

export const Courses = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 768px) {
    padding: 1rem;
  }
  & > div {
    width: 65%;
    margin: 3rem 0;
    height: 350px;
    overflow: hidden;
    @media only screen and (max-width: 700px) {
      width: 100%;
    }
  }
`;
