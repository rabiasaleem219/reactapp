import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  AccesContainer,
  BannerContainer,
  Card,
  SectionContainer,
} from './styles';

const Access = () => {
  return (
    <SectionContainer>
      <AccesContainer>
        <Outlet />
      </AccesContainer>
      <BannerContainer>
        <Card>
          <h5>"Moral y luces son nuestras primeras necesidades"</h5>
          <h6>-Tu padre</h6>
        </Card>
      </BannerContainer>
    </SectionContainer>
  );
};

export default Access;
