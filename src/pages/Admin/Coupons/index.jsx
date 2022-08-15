import { Button, IconButton, Typography } from '@mui/material';
import React from 'react';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import { Box, Container, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchWithToken } from 'helpers/fetch';
import { endPoints } from 'const/endPoints';

import Spinner from 'components/common/Spinner';
import AddCoupon from './AddCoupon';
import DeleteCoupon from './DeleteCoupon';
import EditCoupon from './EditCoupon';
// import EditUser from './EditUser';
// import DeleteUser from './DeleteUser';

const Coupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [flag, setFlag] = useState(false);
    const [addCouponDialog, setCouponDialog] = React.useState(false);
    useEffect(async () => {
        setFlag(false);
        const resp = await fetchWithToken(endPoints.get_all_coupons)
        const data = await resp.json();
        setCoupons(data)
    }, [flag]);

    return <>
        <>
            <Typography textAlign={'center'} variant='h4' fontSize='bold'>
                Cupones
            </Typography>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                <Button variant="contained" onClick={() => setCouponDialog(true)}><AddIcon />Agregar cupón</Button>
            </Stack>
            {addCouponDialog && <AddCoupon flag={setFlag} addCouponDialog={addCouponDialog} setCouponDialog={setCouponDialog} />}
            <Container
                sx={{
                    padding: '2rem 0',
                    height: '100vh',
                }}
            >
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
                        Curso
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
                        Descuento
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
                        Role
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
                    {coupons.length === 0 && <Typography textAlign={'center'}>No se encontraron cupones</Typography>}
                    {coupons.map((item, i) => {
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
                                    {item.id}
                                </Typography>
                                <Typography
                                    sx={{
                                        width: '16%',
                                        flexShrink: 0,
                                        textAlign: 'center',
                                        padding: '0 0.5rem',
                                    }}
                                >
                                    {item.name}
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
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    {item.discount}
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
                                    <EditCoupon coupon={item} flag={setFlag} />
                                    <DeleteCoupon id={item.id} flag={setFlag} />
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </Container>
        </></>
}

export default Coupons;