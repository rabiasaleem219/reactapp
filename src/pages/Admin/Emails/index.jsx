import React from "react";
import { useEffect, useState } from 'react';
import { fetchWithToken } from 'helpers/fetch';
import { endPoints } from 'const/endPoints';
import "tachyons";
import { Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 500,
    },
  },
};

function getStyles(name, emails, theme) {
  return {
    fontWeight:
      emails.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const Emails = () => {

  const [userSelectionType, setUserSelectionType] = useState("Selección por rol")
  const [selectRole, setSelectRole] = useState("estudiante")
  const [emails, setEmails] = useState([]);
  const [customEmail, setCustomEmail] = useState("")
  const [emailTitle, setEmailTitle] = useState("")
  const [emailMessage, setEmailMessage] = useState('')
  const [usersEmails, setUsersEmails] = useState([])
  const theme = useTheme();
  const [loading, setloading] = useState(false)

  const notify = (message) =>
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    const fetchUsers = async () => {
      const resp = await fetchWithToken(endPoints.get_all_users);
      const data = await resp.json();
      const emails = data.map(user => user.email)
      setUsersEmails(emails);
    };
    fetchUsers();

  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setEmails(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log(emails);
  };

  const handleCustomEmail = () => {
    if (!emails.includes(customEmail) && customEmail !== '' && !usersEmails.includes(customEmail)) {
      const newNames = [...usersEmails, customEmail]
      const newEmails = [...emails, customEmail]
      setUsersEmails(newNames)
      setEmails(newEmails)
    }
  }
  const handleSubmit = async (event) => {
    setloading(true)
    event.preventDefault();
    console.log(emails, emailTitle, emailMessage)
    if (!emailTitle) {
      notify("El título del correo electrónico no puede estar vacío")
    }

    else {
      if (userSelectionType === 'Selección por rol') {
        console.log("ROle")
        const body = {
          role: selectRole,
          emailTitle,
          emailMessage
        }
        console.log(body)
        const resp = await fetchWithToken(endPoints.mail_role, body, 'POST');
        const data = await resp.json();
        notify(data.message + " Estado: " + data.statusCode)
      }
      else {
        if (emails.length !== 0) {
          const body = {
            emails,
            emailTitle,
            emailMessage
          }
          console.log("custom", body)
          const resp = await fetchWithToken(endPoints.mail_custom, body, 'POST');
          const data = await resp.json();
          notify(data.message + " Estado: " + data.statusCode)
        }
        else {
          notify("Se debe agregar al menos un correo electrónico")
        }
      }
    }
    setloading(false)
  }



  return <>
    <>
      <Typography marginBottom={4} textAlign="center" variant="h5" fontSize="bold">Send Custom Emails</Typography>
      <Box
        noValidate
      >
        <Stack marginBottom={5} spacing={2} direction='row' alignItems="baseline" justifyContent="space-around">
          <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Tipo de selección de usuario</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userSelectionType}
              label="User Selection Type"
              onChange={(event) => setUserSelectionType(event.target.value)}
            >
              <MenuItem value={'Selección por rol'}>Selección por rol</MenuItem>
              <MenuItem value={"Custom selection"}>La selección personalizada</MenuItem>
            </Select>
          </FormControl>
          {
            userSelectionType === 'Custom selection' ?
              <>
                <FormControl fullWidth sx={{ m: 16 }}>
                  <InputLabel id="demo-multiple-chip-label">Correos electrónicos
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={emails}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {usersEmails.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, emails, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  <TextField id="standard-basic" label="Ingrese el correo electrónico manualmente" variant="standard" onChange={(event) => setCustomEmail(event.target.value)} />
                  <IconButton onClick={handleCustomEmail}><AddIcon /></IconButton>
                </FormControl>
              </>
              :
              <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">Seleccione el rol al que se enviará el correo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectRole}
                  label="Role"
                  onChange={(event) => setSelectRole(event.target.value)}
                >
                  <MenuItem value={"profesor"}>profesor</MenuItem>
                  <MenuItem value={"estudiante"}>estudiante</MenuItem>
                  <MenuItem value={"admin"}>admin</MenuItem>
                </Select>
              </FormControl>
          }
        </Stack>
        <Stack spacing={2} marginBottom={5} direction='column' alignItems="baseline" justifyContent="space-around">
          <TextField required fullWidth value={emailTitle} id="email-title" label="Título del correo electrónico" variant="standard" onChange={(event) => setEmailTitle(event.target.value)} />
        </Stack>
        <Typography variant="h6">Cuerpo del correo electronico</Typography>
        <ReactQuill scrollingContainer={'true'} placeholder="Cuerpo del correo electronico" theme="snow" value={emailMessage} onChange={setEmailMessage} />
      </Box>
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2, maxWidth: "100%", width: 250 }}
        onClick={handleSubmit}
        disabled={loading}
      >
        <EmailIcon />
        Enviar correo electrónico
        {loading && <ClipLoader color={"white"} size={30} />}
      </Button>
    </ >
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  </>
};

export default Emails;
