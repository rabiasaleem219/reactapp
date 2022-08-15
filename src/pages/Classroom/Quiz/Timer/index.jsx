import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';

export const Timer = ({ duration, handleSubmit, onDisplayModal }) => {
  const [timeLeft, setTimeLeft] = useState(`${duration}:00`);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft !== '00:00') {
        const [minutes, seconds] = timeLeft.split(':');
        if (seconds === '00') {
          setTimeLeft(
            () =>
              `${
                parseInt(minutes) <= 10
                  ? `0${parseInt(minutes) - 1}`
                  : parseInt(minutes) - 1
              }:59`
          );
        } else {
          setTimeLeft(
            () =>
              `${minutes}:${parseInt(seconds) <= 10 ? '0' : ''}${
                parseInt(seconds) - 1
              }`
          );
        }
      } else {
        setIsActive(false);
        clearInterval(interval);
        handleSubmit();
        onDisplayModal();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <Box
      sx={{
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'fixed',
        left: '-3%',
        bottom: '-3%',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background:
          'linear-gradient( 90deg, rgba(88,102,173,1) 0%, rgba(83,137,184,1) 30%, rgba(55,176,207,1) 100% );',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
        transition: 'all 0.5s ease-in-out',
      }}
    >
      <Typography
        sx={{
          fontSize: '2rem',
          color: '#fff',
        }}
      >
        {timeLeft}
      </Typography>
    </Box>
  );
};
