import { Button } from '@mui/material';
import React from 'react';
import { NewsItem } from '../../../components/layout/NewsItem';
import { NewsNavbar, NewsTitle } from './styles';

export const HomeSection4 = () => {
  return (
    <>
      <NewsTitle>
        <h1>Noticias</h1>
      </NewsTitle>
      <NewsNavbar>
        <Button>Cursos</Button>
        <Button>Descuentos</Button>
        <Button>Extras</Button>
      </NewsNavbar>
      <NewsItem />
    </>
  );
};
