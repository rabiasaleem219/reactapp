import React, { useState } from 'react'
import ViewComments from './ViewComments'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ClipLoader from "react-spinners/ClipLoader";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';
import { fetchWithToken } from 'helpers/fetch';
import { endPoints } from 'const/endPoints';


const AddComments = ({ courseId }) => {
    const [stars, setStars] = useState(5);
    const [message, setMessage] = useState("");
    const [loading, setloading] = useState(false)
    const user = useSelector((state) => state.auth.user);
    const [flag, setFlag] = useState(false)


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

    const handleSubmit = async () => {
        if (!message) {
            notify("Por favor agregue un comentario")
        }
        else {
            setloading(true)
            const body = {
                stars,
                message,
                user: user.id,
                course: courseId,
            }
            const resp = await fetchWithToken(endPoints.create_comment, body, 'POST')
            const data = await resp.json()
            setloading(false)
            setFlag(!flag)
            notify(data.message)
        }
    }

    return (
        <>
            <Typography textAlign={'center'} marginBottom={5} fontSize={'bold'} variant='h5'>Añadir un comentario
            </Typography>
            <Stack direction="column"
                justifyContent="center"
                alignItems="center"
                marginBottom={4}
                spacing={2}>
                <Box>
                    <Rating
                        name="simple-controlled"
                        value={stars}
                        onChange={(event) => {
                            setStars(+event.target.value);
                        }}

                        size="large"
                    />
                </Box>
                <TextField
                    id="outlined-textarea"
                    label="Deja un comentario"
                    placeholder="Deja un comentario"
                    value={message}
                    multiline
                    fullWidth
                    onChange={(event) => setMessage(event.target.value)}
                />
                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2, maxWidth: "100%", width: 250 }}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Enviar comentarios
                    {loading && <ClipLoader color={"white"} size={30} />}
                </Button>
            </Stack>

            <ViewComments courseId={courseId} oldComments={false} flag={flag} setFlag={setFlag} />
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
    )
}

export default AddComments