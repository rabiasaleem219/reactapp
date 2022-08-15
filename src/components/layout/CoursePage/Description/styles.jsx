import styled from "styled-components";

export const Container = styled.div``;

export const TextContainer = styled.div``;

export const Descripcion = styled.div`
  background-color: #ffff;
  padding: 40px 80px 40px 80px;
  font-family: "Lato", sans-serif;
  font-size: 18px;
  font-weight: 300;
  border-radius: 0px 0px 50px 50px;
  @media screen and (${(props) => props.theme.breakpoints.s}) {
    padding: 40px 10px 40px 10px;
    text-align: center;
  }
`;
