import styled from "styled-components";
//Contenido de las pestañas del acordeon

export const ContentArea = styled.div`
  background-color: ${(props) => props.backg};
  display: flex;
  justify-content: space-between;
  padding: 0rem 1.5rem 0rem 1.5rem;
`;

export const TextArea = styled.div`
  width: 70%;
  & h3 {
    font-family: "Lato", sans-serif;
    font-size: 1.5rem;
    color: #5279b6;
    font-weight: 300;
  }
  & p {
    font-size: 0.9rem;
  }
`;

export const ButtonArea = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
