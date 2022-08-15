import { Box, Button, TextField, Typography } from '@mui/material';
import InputButton from 'components/common/Forms/FormButton';
import Toast from 'components/common/Popup/Toast';
import { endPoints } from 'const/endPoints';
import { fetchWithToken } from 'helpers/fetch';
import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react';

const PaymentDetails = () => {
  //*Estado del modal//
  const [display, setDisplay] = useState(false);
  //*Estado del formulario//
  const [values, setValues] = useState({
    ci: '',
    owner: '',
    bankName: '',
    accountType: '',
    accountNumber: '',
    phoneNumber: '',
    address: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dto = {
      titularName: values.owner,
      bank: values.bankName,
      accountType: values.accountType,
      accountNumber: values.accountNumber,
      phone: values.phoneNumber,
      address: values.address,
      document: values.ci,
    };

    const res = await fetchWithToken(endPoints.payment_set_account, dto, 'PUT');

    if (res.status === 200) {
      Toast('success', 'Se ha guardado correctamente');
      setDisplay(false);
    } else {
      Toast('error', 'Ha ocurrido un error');
      setDisplay(false);
    }
  };

  return (
    <>
      <InputButton text="Datos bancarios" onClick={() => setDisplay(true)} />
      <Dialog
        header="Datos bancarios"
        visible={display}
        onHide={() => setDisplay(false)}
        style={{ width: '60vw', height: '60vh' }}
      >
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ margin: '1rem 0rem' }}>
              Datos de la cuenta bancaria Y el pago movil
            </Typography>
            {/* Contenedor completo */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {/* Contenedor izquierdo */}
              <Box
                sx={{
                  margin: '1rem',
                  width: '50%',
                }}
              >
                <TextField
                  label="Nombre del titular"
                  name="owner"
                  value={values.owner}
                  onChange={handleChange}
                  sx={{
                    margin: '0.5rem',
                    width: '100%',
                  }}
                />
                <TextField
                  label="Documento de Identidad"
                  name="ci"
                  value={values.ci}
                  onChange={handleChange}
                  sx={{
                    margin: '0.5rem',
                    width: '100%',
                  }}
                />
              </Box>
              {/* Contenedor derecho */}
              <Box
                sx={{
                  margin: '1rem',
                  width: '50%',
                }}
              >
                <TextField
                  label="Banco"
                  name="bankName"
                  value={values.bankName}
                  onChange={handleChange}
                  sx={{
                    margin: '0.5rem',
                    width: '100%',
                  }}
                />
                <TextField
                  label="Tipo de cuenta"
                  name="accountType"
                  value={values.accountType}
                  onChange={handleChange}
                  sx={{
                    margin: '0.5rem',
                    width: '100%',
                  }}
                />
              </Box>
            </Box>

            <TextField
              label="Número de cuenta"
              name="accountNumber"
              value={values.accountNumber}
              onChange={handleChange}
              sx={{
                margin: '0.3rem',
                width: '100%',
              }}
            />
            <TextField
              label="Número de telefono"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              sx={{
                margin: '0.3rem',
                width: '100%',
              }}
            />

            <TextField
              label="Direccion fisica para el pago en efectivo"
              name="address"
              value={values.address}
              onChange={handleChange}
              sx={{
                margin: '0.3rem',
                width: '100%',
              }}
            />
          </Box>
          {/* Botones */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              margin: '1rem 0rem 0 0',
            }}
          >
            <Button variant="contained" onClick={handleSubmit}>
              actualizar datos
            </Button>
          </Box>
        </form>
      </Dialog>
    </>
  );
};

export default PaymentDetails;
