import { Box, Container, Pagination, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { fetchWithToken } from 'helpers/fetch';
import { endPoints } from 'const/endPoints';

import Spinner from 'components/common/Spinner';
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';

const Users = () => {
  //*Guardamos la lista de usuarios de la base de datos
  const [users, setUsers] = useState([]);
  const [flag, setFlag] = useState(false);
  //*fetch para obtener usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      const resp = await fetchWithToken(endPoints.get_all_users);
      const data = await resp.json();
      setUsers(data);
    };
    fetchUsers();
    //para que se repita cada vez que borre un usuario
    setFlag(false);
  }, [flag]);

  //*Paginacion
  const [page, setPage] = useState(1); //pagina actual
  const n = 6; //Numero de elementos por paginas
  const totalPages = Math.ceil(users.length / n) + 1; //total de paginas

  const handleChange = (event, value) => {
    setPage(value);
  };
  //*Funcion para listar los usuarios por pagina
  const setUsersInPage = () => {
    let pagination = {};
    let j = 0;
    for (let i = 1; i <= totalPages; i++) {
      pagination[i] = users.slice(j * n, j * n + n);
      j++;
    }

    return pagination;
  };
  const itemList = setUsersInPage();
  console.log(itemList);
  if (users.length === 0) {
    return <Spinner />;
  }
  return (
    <Container
      sx={{
        padding: '2rem 0',
        height: '100vh',
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
        USUARIOS
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
          ID
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
          Nombre
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
          Usuario
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
          Correo
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
          Rol
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
          return (
            <Box
              key={item.id}
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
                {item.id.substring(item.id.length - 4, item.id.length)}
              </Typography>
              <Typography
                sx={{
                  width: '16%',
                  flexShrink: 0,
                  textAlign: 'center',
                  padding: '0 0.5rem',
                }}
              >
                {item.firstName} {item.lastName}
              </Typography>
              <Typography
                sx={{
                  width: '16%',
                  flexShrink: 0,
                  textAlign: 'center',
                  padding: '0 0.5rem',
                }}
              >
                {item.username}
              </Typography>
              <Typography
                sx={{
                  width: '16%',
                  flexShrink: 0,
                  textAlign: 'center',
                  padding: '0 0.5rem',
                  fontSize: '0.8rem',
                }}
              >
                {item.email}
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
                    backgroundColor: '#999898',
                    borderRadius: '7px',
                    color: '#fff',
                    fontSize: '0.8rem',
                    boxShadow: '0px 0px 3px 0px   #000000',
                  }}
                >
                  {item.role}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '16%',
                  flexShrink: 0,
                  textAlign: 'center',
                  padding: '0 0.5rem',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <EditUser user={item} flag={setFlag} />
                <DeleteUser id={item.id} flag={setFlag} />
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
  );
};

export default Users;
