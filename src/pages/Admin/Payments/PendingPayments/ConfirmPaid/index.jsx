import { Box, Button, TextField, Typography } from '@mui/material';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { types } from 'context/types/types';
import { startPaymentApproved, startPaymentRejected } from 'actions/payments';
import Toast from 'components/common/Popup/Toast';

const ConfirmPaid = ({ setFlag, data, dispatch }) => {
  const [visible, setVisible] = useState(false);

  const paymentApproved = async () => {
    dispatch({ type: types.paymentStartApproved, payload: {} });
    const body = await startPaymentApproved(data.payment.id);
    if (!body.statusCode) {
      dispatch({ type: types.paymentApproved, payload: body });
      Toast('success', 'El pago fue aprobado con exito');
      setVisible(false);
      setFlag(true);
    } else {
      dispatch({ type: types.paymentApprovedError, payload: body });
      Toast('error', 'Error al aprobar el pago');
      setVisible(false);
    }
  };

  const paymentRejected = async () => {
    dispatch({ type: types.paymentStartRejected, payload: {} });
    const body = await startPaymentRejected(data.payment.id);
    console.log('rechazado', body);
    if (!body.statusCode) {
      dispatch({ type: types.paymentRejected, payload: body });
      Toast('error', 'El fue pago rechazado');
      setVisible(false);
      setFlag(true);
    } else {
      dispatch({ type: types.paymentRejectedError, payload: body });
      Toast('error', 'Error al rechazar el pago');
      setVisible(false);
    }
  };

  return (
    <>
      <Button size="medium" onClick={() => setVisible(true)}>
        <FactCheckIcon size="large" />
      </Button>

      <Dialog
        header="Confirmar Pago"
        visible={visible}
        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
        style={{
          width: '70vw',
          height: '75vh',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '1.5rem',
              margin: '1rem 0',
            }}
          >
            Producto
          </Typography>
          <TextField
            label="Curso que pago"
            sx={{ margin: '0 10px', width: '100%' }}
            value={data.course.title}
            readOnly
          />
        </Box>
        <Typography
          sx={{
            fontSize: '1.5rem',
            margin: '1rem 0',
          }}
        >
          Datos de la persona
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: '0.5rem 0rem',
            flexShrink: '0',
          }}
        >
          <TextField
            label="name"
            sx={{ margin: '0 10px', width: '50%' }}
            value={`${data.user.firstName} ${data.user.lastName}`}
            readOnly
          />
          <TextField
            label="email"
            sx={{ margin: '0 10px' }}
            value={data.user.email}
            readOnly
          />
          <TextField
            label="tlf"
            sx={{ margin: '0 10px' }}
            value={data.user.phone}
            readOnly
          />
        </Box>
        <Typography
          sx={{
            fontSize: '1.5rem',
            margin: '1rem 0',
          }}
        >
          Datos del pago
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: '0.5rem 0rem',
            flexShrink: '0',
          }}
        >
          <TextField
            label="date"
            sx={{ margin: '0 10px' }}
            value={data.payment.createdAt}
            readOnly
          />
          <TextField
            label="Tipo de pago"
            sx={{ margin: '0 10px' }}
            value={data.payment.paymentMethod}
            readOnly
          />
          <TextField
            label="Referencia"
            sx={{ margin: '0 10px' }}
            value={data.payment.paymentReference}
            readOnly
          />
          <TextField
            label="Monto"
            sx={{ margin: '0 10px' }}
            value={data.payment.amount}
            readOnly
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            margin: '1rem 0rem',
          }}
        >
          <Button
            variant="contained"
            color="success"
            sx={{ margin: '0 1rem' }}
            onClick={paymentApproved}
          >
            Aceptar
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ margin: '0 1rem' }}
            onClick={paymentRejected}
          >
            Rechazar
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default ConfirmPaid;
