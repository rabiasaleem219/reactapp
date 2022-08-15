import React from "react";
import { Button } from "../../Buttons/MainButton";
import { ButtonArea, ContentArea, TextArea } from "./styles";

const AccordionContent = (props) => {
  return (
    <ContentArea backg={props.backg}>
      <TextArea>
        <h3>{props.titulo}</h3>
        <p>{props.texto}</p>
      </TextArea>
      <ButtonArea>
        <Button
          text={props.boton}
          width="60%"
          padding="0.7rem 1rem"
          color={props.color}
          fontSize="0.9rem"
          fontWeight="600"
          backgroundColor={props.backgroundColor}
          border="2px solid #5279b6"
          shadow={props.shadow}
        />
      </ButtonArea>
    </ContentArea>
  );
};

export default AccordionContent;
