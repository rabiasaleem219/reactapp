import styled from "styled-components";

export const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding:0.25em 1em;
  space-between: 1em;
  color: ${(props) => props.theme.colors.titleBlue};
  font-size: 4rem;
  margin-left: 0.25em;
  margin-right: 0.25em;
}
`;
