import { toCapitalize } from "helpers/toCapitalize";
import React from "react";
import { SectionContainer, TextContainer } from "./styles";

const CourseSection1 = ({ title }) => {
  //title to capitalize

  return (
    <SectionContainer>
      <TextContainer>
        <h1>{toCapitalize(title)}</h1>
      </TextContainer>
    </SectionContainer>
  );
};

export default CourseSection1;
