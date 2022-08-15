import { Box, Container, Pagination, Typography } from '@mui/material';
import React, { useState } from 'react';
import ConfirmPaid from '../PendingPayments/ConfirmPaid';

const PaymenHistory = ({ setFlag, payments, dispatch }) => {
  //*Paginacion
  const [page, setPage] = useState(1); //pagina actual
  const n = 6; //Numero de elementos por paginas
  const totalPages = Math.ceil(payments.length / n) + 1; //total de paginas
  //ordenar payments desde el ultimo elemento al primero
  const sortedPayments = payments.slice().reverse();

  const handleChange = (event, value) => {
    setPage(value);
  };
  //*Funcion para listar los usuarios por pagina
  const setitemsInPage = () => {
    let pagination = {};
    let j = 0;
    for (let i = 1; i <= totalPages; i++) {
      pagination[i] = sortedPayments.slice(j * n, j * n + n);
      j++;
    }

    return pagination;
  };
  const itemList = setitemsInPage();

  return (
    <>
      <Container
        sx={{
          padding: '2rem 0',
          height: '70%',
        }}
      >
        {/* //* TITULO */}
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 0 2rem 0',
            fontSize: '1.5rem',
          }}
        >
          Historial de pagos
        </Typography>

        {/* //* header del historial de compras */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '1.5rem 0',
            boxShadow: '0px 0px 5px -1px   #999898',
          }}
        >
          <Typography
            sx={{
              width: '16%',
              flexShrink: 0,
              borderRight: 'solid 1px #999898',
              textAlign: 'center',
              padding: '0 0.5rem',
              fontWeight: '600',
            }}
          >
            N.Ref
          </Typography>
          <Typography
            sx={{
              width: '16%',
              flexShrink: 0,
              borderRight: 'solid 1px #999898',
              textAlign: 'center',
              padding: '0 0.5rem',
              fontWeight: '600',
            }}
          >
            Producto
          </Typography>
          <Typography
            sx={{
              width: '16%',
              flexShrink: 0,
              borderRight: 'solid 1px #999898',
              textAlign: 'center',
              padding: '0 0.5rem',
              fontWeight: '600',
            }}
          >
            Fecha
          </Typography>
          <Typography
            sx={{
              width: '16%',
              flexShrink: 0,
              borderRight: 'solid 1px #999898',
              textAlign: 'center',
              padding: '0 0.5rem',
              fontWeight: '600',
            }}
          >
            Monto
          </Typography>
          <Typography
            sx={{
              width: '16%',
              flexShrink: 0,
              borderRight: 'solid 1px #999898',
              textAlign: 'center',
              padding: '0 0.5rem',
              fontWeight: '600',
            }}
          >
            Estado
          </Typography>
          <Typography
            sx={{
              width: '16%',
              flexShrink: 0,
              textAlign: 'center',
              padding: '0 0.5rem',
              fontWeight: '600',
            }}
          >
            Acciones
          </Typography>
        </Box>

        {/* //* Contenido del historial de compras */}
        <Box
          sx={{
            margin: '1.5rem 0rem',
            height: '70%',
          }}
        >
          {itemList[page].map((item, i) => {
            const color = i % 2 === 0 ? '#F0F0F0' : '#fff';
            let color2;
            if (item.payment.paymentStatus === 'APPROVED') color2 = '#58b33d';

            if (item.payment.paymentStatus === 'REJECTED') color2 = '#da3737';

            if (item.payment.paymentStatus === 'PENDING') color2 = '#999898';

            return (
              <Box
                key={item.payment.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  margin: '1rem 0rem',
                  backgroundColor: color,
                  padding: '1rem 0',
                  borderTop: 'none',
                  borderBottom: 'solid 1px #999898',
                }}
              >
                <Typography
                  sx={{
                    width: '16%',
                    flexShrink: 0,
                    textAlign: 'center',
                    padding: '0 0.5rem',
                  }}
                >
                  {item.payment.paymentReference}
                </Typography>
                <Typography
                  sx={{
                    width: '16%',
                    flexShrink: 0,
                    textAlign: 'center',
                    padding: '0 0.5rem',
                  }}
                >
                  {item.course.title}
                </Typography>
                <Typography
                  sx={{
                    width: '16%',
                    flexShrink: 0,
                    textAlign: 'center',
                    padding: '0 0.5rem',
                  }}
                >
                  {item.payment.createdAt}
                </Typography>
                <Typography
                  sx={{
                    width: '16%',
                    flexShrink: 0,
                    textAlign: 'center',
                    padding: '0 0.5rem',
                  }}
                >
                  {item.payment.amount} VES
                </Typography>
                <Box
                  sx={{
                    width: '16%',
                    flexShrink: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      width: '60%',
                      flexShrink: 0,
                      textAlign: 'center',
                      padding: '0.16rem 0.5rem',
                      backgroundColor: color2,
                      borderRadius: '7px',
                      color: '#fff',
                      fontSize: '0.8rem',
                      boxShadow: '0px 0px 5px 0px   #999898',
                    }}
                  >
                    {item.payment.paymentStatus === 'APPROVED' && 'APROBADO'}
                    {item.payment.paymentStatus === 'REJECTED' && 'RECHAZADO'}
                    {item.payment.paymentStatus === 'PENDING' && 'PENDIENTE'}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: '16%',
                    flexShrink: 0,
                    textAlign: 'center',
                    padding: '0 0.5rem',
                  }}
                >
                  <ConfirmPaid
                    setFlag={setFlag}
                    data={item}
                    dispatch={dispatch}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1.5rem',
          }}
        >
          <Pagination
            count={totalPages - 1}
            shape="rounded"
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Container>
    </>
  );
};

export default PaymenHistory;
