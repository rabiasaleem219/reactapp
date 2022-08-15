import styled from "styled-components";

export const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
`;

export const TextAreaItem = styled.textarea`
  padding: ${(props) => props.padding || "0px 25px"};
  border: none;
  border-radius: 45px;
  width: ${(props) => props.width || "60%"};
  height: ${(props) => props.heigth || "150px"};
  margin: ${(props) => props.margin || "40px 0px 5px 0px"};
  background-color: #f2f2f2;

  &:focus {
    outline: none;
  }
`;

export const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.red};
  font-size: 0.8rem;
  margin: 0.2rem 0 0.5rem 1rem;
  align-self: flex-start;
  padding-left: 15%;
`;
