import React, { useState, useEffect } from 'react';
import {
  Content,
  Details,
  Logos,
  LogosContainer,
  TextContainer,
  VerticalLine,
} from './styles';
import Stack from '@mui/material/Stack';
import {
  Container,
} from './styles';
import logo from '../../../assets/images/cenaoz-logo.svg';
import { toCapitalize } from 'helpers/toCapitalize';
import CommonCourseThings from '../Common';

const CourseSection3 = ({
  duration,
  level,
  numberOfStudents,
  price,
  category,
  isPay,
  setLoading
}) => {


  return (
    <Container>
      <Content>
        <TextContainer>
          <Details>
            <p>
              <b>Duración: </b>
              <span> {duration}</span>
            </p>
          </Details>

          <Details>
            <p>
              <b>Nivel: </b>
              <span> {toCapitalize(level)} </span>
            </p>
          </Details>
          <Details>
            <p>
              <b>Inscritos: </b>
              <span> {numberOfStudents} </span>
            </p>
          </Details>
          <Details>
            <p>
              <b>Precio: </b>
              <span> {price} </span>
            </p>
          </Details>
          <Details>
            <p>
              <b>Categoria: </b>
              <span> {category} </span>
            </p>
          </Details>
        </TextContainer>
        <VerticalLine />
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <LogosContainer>
            <Logos>
              <img src={logo} alt="Cenaoz" />
            </Logos>
          </LogosContainer>
          <CommonCourseThings isPay={isPay} setLoading={setLoading} />
        </Stack>

      </Content>
    </Container>
  );
};

export default CourseSection3;
