import styled from 'styled-components';

export const CreateCourseTitle = styled.h1`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.titleBlue};
`;

export const Container = styled.div`
  padding: 0 50px 0 50px;
  & > h1 {
    text-align: center;
  }
  & > form {
    padding: 2rem 0;
    background-color: white;
    border-radius: 45px;
  }
`;

export const Formulario = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const LeftSide = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 15px 0 0px;
`;

export const RightSide = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0px 0 15px;
`;
