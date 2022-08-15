import { Switch } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { BackgroundNavbar } from '../../components/common/BackgroundNavbar';
import { MenuBar } from '../../components/common/MenuBar';
import { BasicSwitch } from '../../components/common/SwitchButton';
import { ContactForm } from '../../components/layout/ContactForm';
import Resize from '../../helpers/Resize';
import {
  ContactContainer,
  ContactSwitch,
  ContactSwitchTextLeft,
  ContactSwitchTextRight,
} from './styles';

const Contac = () => {
  const width = Resize();
  const { user } = useSelector((state) => state.auth);
  const [switchStatus, setSwitchStatus] = React.useState(false);
  const handleSwitch = (e) => {
    setSwitchStatus(e.target.checked);
  };
  return (
    <>
      <BackgroundNavbar />
      {user && width > 920 ? <MenuBar /> : null}
      <ContactContainer>
        <ContactSwitch>
          <ContactSwitchTextLeft status={switchStatus}>
            Soporte Técnico
          </ContactSwitchTextLeft>
          <BasicSwitch onChange={handleSwitch} checked={switchStatus} />
          <ContactSwitchTextRight status={switchStatus}>
            Soporte Educacional
          </ContactSwitchTextRight>
        </ContactSwitch>
        <ContactForm status={switchStatus} />
      </ContactContainer>
    </>
  );
};

export default Contac;
