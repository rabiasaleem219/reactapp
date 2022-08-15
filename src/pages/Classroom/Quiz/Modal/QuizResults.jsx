import { Box } from '@mui/system';
import { Button } from 'components/common/Buttons/MainButton';
import Spinner from 'components/common/Spinner';
import { Dialog } from 'primereact/dialog';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Typography } from '@mui/material';

export const QuizResults = ({ handleSubmit, displayModal, quizResults }) => {
  const { score, status } = quizResults || {};

  return (
    <>
      <Button text={'Enviar resultados'} click={handleSubmit} />;
      {quizResults && (
        <Dialog
          header={false}
          visible={displayModal}
          modal={true}
          closable={false}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50vw',
            }}
          >
            {status === 'APROBADO' ? (
              <>
                <CheckCircleOutlineIcon
                  sx={{
                    color: '#4dc95d',
                    fontSize: '5rem',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '2rem',
                    marginTop: '1rem',
                  }}
                >
                  ¡Felicidades! Has aprobado el quiz.
                </Typography>
              </>
            ) : (
              <>
                <HighlightOffIcon
                  sx={{
                    color: '#f21d41',
                    fontSize: '5rem',
                  }}
                ></HighlightOffIcon>
                <Typography
                  sx={{
                    fontSize: '2rem',
                    marginTop: '1rem',
                  }}
                >
                  Has reprobado, vuelve a intentarlo luego.
                </Typography>
              </>
            )}
            <Typography
              sx={{
                fontSize: '1.8rem',
                marginTop: '1rem',
                marginBottom: '3rem',
              }}
            >
              Tu puntaje fue de {score}%
            </Typography>
            <Button text={'Continuar el curso'} path={-1}></Button>
          </Box>
        </Dialog>
      )}
    </>
  );
};
