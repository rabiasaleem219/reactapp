import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

import { fetchWithToken } from 'helpers/fetch';
import { endPoints } from 'const/endPoints';
import Spinner from 'components/common/Spinner';

export const Question = ({ question, setResponses, responses }) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);

  const getOptions = async () => {
    const response = await fetchWithToken(
      `${endPoints.get_all_options_by_question}/${question.id}`
    );
    const data = await response.json();
    setOptions(data);
  };

  useEffect(() => {
    getOptions();
  }, []);

  const getResponses = (option, questionId) => {
    setResponses([
      ...responses.filter((response) => response.questionId !== questionId),
      { questionId, option },
    ]);
  };

  useEffect(() => {
    const filterResponses = responses?.find(
      (response) => response.questionId === question.id
    );
    if (filterResponses) {
      setSelected(filterResponses.option.id);
    }
  }, [responses]);

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        padding: '2rem 0',
        borderRadius: '35px',
        width: '100%',
        margin: '2rem 0',
        transition: 'all 0.5s ease-in-out',
        '&:hover': {
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Typography
        sx={{
          fontSize: '2rem',
          color: '#7f7f7f',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        {question.question}
      </Typography>
      <form>
        <Box>
          {options.length > 0 &&
            options.map((option) => {
              return (
                <Box
                  key={option.id}
                  sx={{
                    padding: '1rem 5rem',
                    backgroundColor:
                      selected === option.id ? 'rgb(74 149 191 / 75%)' : '#fff',
                    transition: 'all 0.2s ease-in-out',
                    // '&:hover': {
                    //   backgroundColor: '#f5f5f5',
                    // },
                  }}
                  onClick={() => getResponses(option, question.id)}
                >
                  <Typography
                    sx={{
                      fontSize: '1.2rem',
                      color: selected === option.id ? '#fff' : '#7f7f7f',
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    {option.title}
                  </Typography>
                </Box>
              );
            })}
        </Box>
      </form>
    </Box>
  );
};
