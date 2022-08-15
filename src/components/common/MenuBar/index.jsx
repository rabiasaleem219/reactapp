import React from 'react';
import Resize from '../../../helpers/Resize';
import ProfileMenu from '../../layout/ProfileMenu';
import { MenuBarContainer } from './styles';

export const MenuBar = () => {
  const width = Resize();

  return (
    <MenuBarContainer>{width > 920 ? <ProfileMenu /> : null}</MenuBarContainer>
  );
};
