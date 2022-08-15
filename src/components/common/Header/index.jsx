import React from 'react';
import {
  Container1,
  Container2,
  Container3,
  Container4,
  HeaderContainer,
} from './styles';
import logo from '../../../assets/images/gobierno-bolivariano-logo.webp';
import logo2 from '../../../assets/images/200anos.webp';

export const Header = () => {
  return (
    <HeaderContainer>
      <Container1>
        <img src={logo} alt="Gobierno Bolivariano de Venezuela" />
      </Container1>
      <Container2>
        <p>
          Ministry of Popular Power of the Ofﬁce of the Presidency <br /> and
          Monitoring of Government Management.
        </p>
      </Container2>
      <Container3>
        Scientiﬁc Center Foundation <br />
        Ozone National
      </Container3>
      <Container4>
        <img src={logo2} alt="200 años de la batalla de carabobo" />
      </Container4>
    </HeaderContainer>
  );
};
