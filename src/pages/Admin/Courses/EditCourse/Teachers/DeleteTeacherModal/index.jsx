import { endPoints } from 'const/endPoints';
import { fetchWithToken } from 'helpers/fetch';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ClearIcon from '@mui/icons-material/Clear';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { AddTeacherButton, DeleteTeacherButton } from './styles';
import { toCapitalize } from 'helpers/toCapitalize';
import { profileImageLink } from 'const/profileImageLink';
import Toast from 'components/common/Popup/Toast';

export const DeleteTeacherModal = ({ courseId, setFlag, teachers }) => {
  //**** Modal display *****/
  const [display, setDisplay] = useState(false);
  const onDisplay = () => {
    setDisplay(true);
  };
  const onHide = () => {
    setDisplay(false);
  };

  //***** Delete teacher *****//
  const deleteTeacher = async (teacherId, courseId) => {
    console.log(teacherId, courseId);
    const resp = await fetchWithToken(
      endPoints.delete_teacher_to_course,
      {
        teacherId: teacherId,
        courseId: courseId,
      },
      'DELETE'
    );
    const body = await resp.json();
    console.log(body);
    if (resp.status !== 200) {
      setDisplay(false);
      Toast('error', body.message);
    } else {
      setFlag(true);
      setDisplay(false);
      Toast('success', body.message);
    }
  };

  return (
    <>
      <DeleteTeacherButton onClick={() => onDisplay()}>
        Eliminar profesor
      </DeleteTeacherButton>
      <Dialog
        header="Agrega un profesor al curso"
        visible={display}
        contentStyle={{ borderRadius: ' 0 0 10px 10px' }}
        style={{ width: '70vw' }}
        onHide={() => onHide()}
        resizable={false}
        draggable={false}
      >
        {teachers.length !== 0 ? (
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {teachers.map((teacher) => {
              return (
                <ListItem
                  key={teacher.id}
                  sx={{
                    width: '50%',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="profile"
                      src={`${profileImageLink}${teacher.image}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={toCapitalize(
                      `${teacher.firstName} ${teacher.lastName}`
                    )}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Profesor
                        </Typography>
                        {` — ${teacher.username}`}
                      </>
                    }
                  />
                  <ListItemButton
                    sx={{
                      justifySelf: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                    onClick={() => {
                      setFlag(false);
                      deleteTeacher(teacher.id, courseId);
                    }}
                  >
                    <ClearIcon
                      sx={{
                        color: '#ff555b',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <h1>No hay profesores para eliminar</h1>
        )}
      </Dialog>
    </>
  );
};
