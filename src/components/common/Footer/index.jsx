import React from "react";
import { FooterContainer } from "./styles";
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

export const Footer = () => {
  return (
    <FooterContainer>
      <Stack spacing={4} direction='row'>
        <Tooltip title="Ir a la página">
          <Button variant="contained" href="/condiciones-legales-del-campus">
            <Typography>Condiciones de uso del Campus</Typography>
          </Button>
        </Tooltip>
        <Tooltip title="Ir a la página">
          <Button variant="contained" href="/politicas-de-privacidad">
            <Typography>Aviso Legal y Política de Privacidad</Typography>
          </Button>
        </Tooltip>
      </Stack>
      <Stack direction="column" paddingTop={1} paddingBottom={0.5} justifyContent="center" alignItems="center" alignContent={"center"}>
        <Typography >© 2022 by CENAOZ. National Ozone Scientific Center Foundation </Typography>
        <Typography >G-20016265-1</Typography>
      </Stack>
    </FooterContainer>
  );
};
