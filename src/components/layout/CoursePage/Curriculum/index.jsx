import React from "react";
import SimpleAccordion from "../../../common/Accordion";
import { Container, Descripcion, TextContainer } from "../Description/styles";

const Curriculum = () => {
  return (
    <Container>
      <TextContainer>
        <Descripcion>
          <SimpleAccordion text1="Modulo 1" text2="Modulo 2" text3="Modulo 3" />
        </Descripcion>
      </TextContainer>
    </Container>
  );
};

export default Curriculum;
