import React from "react";
import { Container, Descripcion, TextContainer } from "../Description/styles";
import { fetchWithToken } from 'helpers/fetch';
import { endPoints } from 'const/endPoints';
import Toast from 'components/common/Popup/Toast';
import { Button, Link, Typography } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import Stack from '@mui/material/Stack';
var FileSaver = require('file-saver');

const Certificates = ({ course }) => {
  const [body, setBody] = React.useState()
  const [loading, setLoading] = React.useState(true)
  React.useEffect(async () => {
    const resp = await fetchWithToken(
      `${endPoints.get_certificate}/${course.id}`
    );
    const body = await resp.json();
    console.log(body);
    if (resp.status === 200) {
      setBody(body)
      Toast('success', body.message);
    } else {
      setBody(body)
      Toast('error', body.message);
    }
    setLoading(false);
  }, []);

  const handleResource = async () => {
    FileSaver.saveAs(body.certificate.url, `${course.title} certificate`)
    Toast('success', "Resource Downloaded successfully");
  }
  return (
    <Container>
      <TextContainer>
        <Descripcion>
          {loading &&
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <ClipLoader color="blue" size={30}></ClipLoader>
              <Typography textAlign={'center'}>Espera preparando tu certificado</Typography>
            </Stack>
          }
          {
            body &&
              body.statusCode === 200 ?
              <>
                <Typography textAlign={'center'}>Boom has completado curso, descarga tu certificado</Typography>
                <Typography textAlign={'center'} variant='h4'><Button onClick={handleResource} color="primary">Haga clic aquí</Button></Typography>
              </> :
              <>
                {body && <Typography textAlign={'center'}>{body.message}</Typography>}
              </>
          }
        </Descripcion>
      </TextContainer>
    </Container>
  );
};

export default Certificates;
