import styled from "styled-components";

export const InputContainer = styled.div`
  width: ${(props) => props.width || "100%"};
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.alignItems || "center"};

  margin: 10px 0;

  & label {
    font-size: 1rem;
    color: #b8b8b8;
    font-weight: lighter;
  }
`;

export const InputItem = styled.input`
  display: ${(props) => props.display || ""};
  padding: ${(props) => props.padding || "0px 25px"};
  border: none;
  border-radius: 45px;
  width: ${(props) => props.width || "75%"};
  height: ${(props) => props.heigth || "50px"};
  margin: ${(props) => props.margin || "40px 0px 5px 0px"};
  background-color: ${(props) => props.backgroundColor || "#f5f5f5"};
  color: ${(props) => props.color || "#6c757d"};
  font-size: ${(props) => props.fontSize || "1rem"};
  &:focus {
    outline: none;
  }
`;

export const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.red};
  font-size: 0.8rem;
  margin: 0rem 0 0.1rem 1rem;
  align-self: flex-start;
  padding: ${(props) => props.errorPadding || "0"};
`;
