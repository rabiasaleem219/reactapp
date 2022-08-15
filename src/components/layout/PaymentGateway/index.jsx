import { useEffect, useState } from 'react';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import InputButton from 'components/common/Forms/FormButton';
import { Dialog } from 'primereact/dialog';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import * as Yup from 'yup';
import Stack from '@mui/material/Stack';
import { Form } from './styles';
import ClipLoader from "react-spinners/ClipLoader";
import { formatYupErrors } from 'helpers/formatYupErrors';
import { startCreatePayment } from 'actions/payments';
import Toast from 'components/common/Popup/Toast';
import Transfer from './TypePaids/Transfer';
import Cash from './TypePaids/Cash';
import PaidMobile from './TypePaids/PaidMobile';
import { fetchWithToken } from 'helpers/fetch';
import { endPoints } from 'const/endPoints';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import VerifiedIcon from '@mui/icons-material/Verified';

const PaymenGateway = (props) => {
  const user = useSelector((state) => state.auth.user);
  const [payableAmount, setPayableAmount] = useState(+props.amount)
  const [coupon, setCoupon] = useState()
  const [verifiedCoupon, setVerifiedCoupon] = useState()
  const [sicad, setSicad] = useState()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)
  useEffect(async () => {
    const data = await fetch("https://s3.amazonaws.com/dolartoday/data.json")
    const resp = await data.json()
    setSicad(resp.USD.sicad1)
  }, [])



  const navigate = useNavigate();
  // Estado del modal
  const [visible, setVisible] = useState(null);
  // Estado del formulario
  const [values, setValues] = useState({
    paymentMethod: '',
    amount: payableAmount,
    paymentReference: '',
    courseId: props.courseId,
  });
  //Estado de los errores del formulario
  const [error, setError] = useState(null);
  const [paymentAccount, setPaymentAccount] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const getPaymentAccount = async () => {
    const res = await fetchWithToken(endPoints.payment_get_account);
    const body = await res.json();
    if (res.status === 200) {
      setPaymentAccount(body);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error === null) {
      props.setLoading(true);
      if (verifiedCoupon) {
        values.coupon = verifiedCoupon.id
        values.amount = payableAmount
      }
      const body = await startCreatePayment(values);
      if (!body.statusCode) {
        props.setLoading(false);
        Toast('success', 'Datos del pago enviados con exito');
        if (payableAmount === 0) {
          window.location.href = "/profile/courses"
        }
        setVisible(false);
      } else {
        Toast('error', body.message);
      }
    }
  };

  const handleCouponVerification = (async () => {
    setLoading(true)
    const checkCoupon = await fetchWithToken(endPoints.verify_coupon, { name: coupon, course: props.courseId }, 'POST')
    const data = await checkCoupon.json()
    if (data.statusCode === 200) {
      setVerifiedCoupon(data.coupon)
      const amount = (payableAmount - ((payableAmount * data.coupon.discount) / 100))
      setPayableAmount(amount)
      if (amount === 0) {
        setMessage(true)
      }
      Toast('success', data.message)
    }
    else {
      Toast('error', data.message)
    }
    setLoading(false)
  })

  //*Validaciones del formulario//
  const validationSchema = Yup.object().shape({
    paymentMethod: Yup.string().required('Seleccione el tipo de pago'),
    paymentReference: Yup.string().required(
      'Ingrese el numero de referencia del pago'
    ),
  });

  useEffect(() => {
    getPaymentAccount();
  }, []);

  useEffect(() => {
    validationSchema
      .validate(values, { abortEarly: false })
      .then(() => setError(null))
      .catch((err) => setError(err));
  }, [values]);

  return (
    <>
      <InputButton
        text={user ? 'Pagar' : 'Registrarse'}
        onClick={
          user ? () => setVisible(true) : () => navigate('/access/login')
        }
        fontSize={'1.5rem'}
        padding={'2rem 4rem'}
        alignItems={'center'}
        display={'flex'}
      />

      <Dialog
        visible={visible}
        onHide={() => setVisible(false)}
        header="Pasarela de pago"
        draggable={false}
        resizable={false}
        style={{
          width: '80vw',
          height: '90vh',
        }}
      >
        <Box>
          {/* //* Titulo de la compra */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Stack>
              <Typography textAlign={'center'} variant="h4" sx={{ margin: '1rem 0rem' }}>
                {props.cleanTitle}
              </Typography>
              <Typography variant="h6">
                Cantidad a pagar: {payableAmount}$  /  {(payableAmount * sicad).toFixed(2)} Sicad
              </Typography>
              {message &&
                <Typography textAlign={'center'} variant="h6">
                  Su referencia de pago gratuito es: "111111111" Elige: "Transferencia" Metodos de pago
                </Typography>}
            </Stack>
          </Box>
          {/* //* Formulario */}
          <Form onSubmit={handleSubmit}>
            <Typography variant="h5">Metodos de pago</Typography>
            {/* Contendor del grupo completo de inputs radio */}
            <Box
              sx={{
                margin: '2rem',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="paymentMethod"
                  value={values.paymentMethod}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="TRANSFERENCIA"
                    control={<Radio />}
                    label="Transferencia"
                  />
                  <FormControlLabel
                    value="PAGO_MOVIL"
                    control={<Radio />}
                    label="Pago Movil"
                  />
                  <FormControlLabel
                    value="EFECTIVO"
                    control={<Radio />}
                    label="Efectivo"
                  />
                </RadioGroup>
                {error && formatYupErrors(error.inner, 'typePaid') && (
                  <span style={{ color: 'red', fontSize: '12px' }}>
                    {formatYupErrors(error.inner, 'typePaid').message}
                  </span>
                )}
              </FormControl>
            </Box>
            {/* Plantilla que se va a mostrar segun el tipo de pago */}
            {values.paymentMethod === 'TRANSFERENCIA' && (
              <Transfer amount={props.amount} account={paymentAccount} />
            )}
            {values.paymentMethod === 'PAGO_MOVIL' && (
              <PaidMobile amount={props.amount} account={paymentAccount} />
            )}
            {values.paymentMethod === 'EFECTIVO' && (
              <Cash amount={props.amount} account={paymentAccount} />
            )}
            {values.paymentMethod === '' && null}

            {/* Input para meter la Ref */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                margin: '1rem 0',
              }}
            >

              <TextField
                label="Ingrese el numero de referencia del pago"
                name="paymentReference"
                value={values.paymentReference}
                onChange={handleChange}
                sx={{
                  '& > :not(style)': { width: '80%', marginTop: verifiedCoupon ? 3 : 0 },
                }}
                fullWidth
              />
              {!loading && <> {
                verifiedCoupon && <Stack direction="column"> <h4>Cupón aprobado!<VerifiedIcon /></h4></Stack>
              }
                {!verifiedCoupon && <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField onChange={(event) => setCoupon(event.target.value)} onid="outlined-basic" label="Introducir cupón" variant="outlined" />
                  <IconButton variant="contained" size='small' onClick={handleCouponVerification}><AddIcon />Verificar</IconButton>
                </Box>
                }
              </>}
              {loading && <> <ClipLoader color='blue' size={30} /> verificando </>}

            </Box>
            {error && formatYupErrors(error.inner, 'paymentReference') && (
              <span style={{ color: 'red', fontSize: '12px' }}>
                {formatYupErrors(error.inner, 'paymentReference').message}
              </span>
            )}
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  margin: '0 5px ',
                }}
              >
                Nota:
              </Typography>
              <Typography>
                El pago sera aprobado luego de ser verificado. Esto puedo tardar
                72h
              </Typography>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '2rem ',
              }}
            >
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!values.paymentMethod || !values.paymentReference}
              >
                Comprar
              </Button>
            </Box>
          </Form>
        </Box>
      </Dialog >
    </>
  );
};

export default PaymenGateway;
