import { Box } from '@mui/material';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import React, { useState } from 'react';
import { fetchWithToken } from 'helpers/fetch';
import { endPoints } from 'const/endPoints';
import { useEffect } from 'react';

const MyScore = () => {
  const [scores, setScores] = useState([]);

  const getScores = async () => {
    const res = await fetchWithToken(endPoints.get_my_score);
    const data = await res.json();
    data.map((score) => {
      const calification = `${score.score}%`;
      // comprobamos si el score con ese id ya existe en el array
      if (scores.find((s) => s.id === score.id)) {
        const index = scores.findIndex((s) => s.id === score.id);
        scores[index].score = calification;
      }
      setScores((prev) => [
        ...prev,
        {
          Curso: score.course.title,
          Quiz: score.quiz.name,
          Calificación: calification,
          Estatus: score.status,
        },
      ]);
    });
  };

  const EstatusTemplate = (rowData) => {
    if (rowData.Estatus === 'APROBADO') {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            padding: '5px',
            borderRadius: '10px',
            background: '#c8e6c9',
            color: '#256029',
          }}
        >
          Aprobado
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            padding: '5px',
            borderRadius: '10px',
            background: '#ffcdd2',
            color: '#c63737',
          }}
        >
          Reprobado
        </Box>
      );
    }
  };

  useEffect(() => {
    getScores();
  }, []);

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 300px)',
      }}
    >
      <Box>
        <div>
          <Box
            sx={{
              span: {
                fontSize: '1rem',
                color: '#a0a0a0',
                fontFamily: 'helvetica',
              },
            }}
          >
            <DataTable
              value={scores}
              responsiveLayout="stack"
              breakpoint="960px"
              emptyMessage="No tienes calificaciones disponibles"
              style={{ borderRadius: '10px' }}
            >
              <Column field="Curso" header="Curso" />
              <Column field="Quiz" header="Quiz" />
              <Column field="Calificación" header="Calificación" />
              <Column field="Estatus" header="Estatus" body={EstatusTemplate} />
            </DataTable>
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default MyScore;
