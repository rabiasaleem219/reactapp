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
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { AddTeacherButton } from './styles';
import { toCapitalize } from 'helpers/toCapitalize';
import { profileImageLink } from 'const/profileImageLink';
import Toast from 'components/common/Popup/Toast';

export const AddTeacherModal = ({ courseId, setFlag }) => {
  //**** Modal display *****/
  const [display, setDisplay] = useState(false);
  const onDisplay = () => {
    setDisplay(true);
  };
  const onHide = () => {
    setDisplay(false);
  };

  //***** Get Teachers *****//
  const [AllTeachers, setAllTeachers] = useState([]);
  const getAllTeachers = async () => {
    const resp = await fetchWithToken(
      `${endPoints.get_users_by_role}/profesor`
    );
    const body = await resp.json();
    if (resp.status === 200) {
      setAllTeachers(body);
    } else {
      setAllTeachers([]);
    }
    console.log(AllTeachers);
  };

  useEffect(() => {
    getAllTeachers();
  }, []);

  //***** Add teacher *****//
  const addTeacher = async (teacherId, courseId) => {
    const resp = await fetchWithToken(
      endPoints.add_teacher_to_course,
      {
        teacherId: teacherId,
        courseId: courseId,
      },
      'PUT'
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
      <AddTeacherButton onClick={() => onDisplay()}>
        Agregar profesor
      </AddTeacherButton>
      <Dialog
        header="Agrega un profesor al curso"
        visible={display}
        contentStyle={{ borderRadius: ' 0 0 10px 10px' }}
        style={{ width: '70vw' }}
        onHide={() => onHide()}
        resizable={false}
        draggable={false}
      >
        {AllTeachers.length !== 0 ? (
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {AllTeachers.map((teacher) => {
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
                      addTeacher(teacher.id, courseId);
                    }}
                  >
                    <AddIcon
                      sx={{
                        color: '#5e82be',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <h1>No hay profesores disponibles</h1>
        )}
      </Dialog>
    </>
  );
};
