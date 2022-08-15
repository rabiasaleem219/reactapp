import { Box, Typography } from '@mui/material';
import React from 'react';

const Cash = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ margin: '1rem 0rem' }}>
        Direccion fisica donde puede ir a realizar el pago en efectivo
      </Typography>
      {/* Contenedor completo */}

      <Box
        sx={{
          display: 'flex',
          margin: '1rem 0',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            margin: '0 5px ',
          }}
        >
          Direccion
        </Typography>
        <Typography>{props.account.address}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          margin: '1rem 0',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            margin: '0 5px ',
          }}
        >
          Monto:
        </Typography>
        <Typography>{props.amount} VES</Typography>
      </Box>
    </Box>
  );
};

export default Cash;
