import styled from 'styled-components';

export const AddTeacherButton = styled.button`
  border: none;
  border-radius: 35px;
  color: #ffffff;
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  height: 2.8rem;
  padding: 0.5rem 1rem;
  margin: 1.5rem 3rem 0 0;
  cursor: pointer;
  box-shadow: 0px 13px 99px rgb(4 12 105 / 1%);
  background-color: ${(props) => props.theme.colors.headerBlue};
`;
