import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Avatar, Grid, Paper } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import { fetchWithToken } from 'helpers/fetch';
import { endPoints } from 'const/endPoints';
import { Typography } from '@mui/material';
import Slide from "@mui/material/Slide";
import DeleteIcon from "@mui/icons-material/Delete";
import "tachyons";
import ClipLoader from "react-spinners/ClipLoader";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Toast from 'components/common/Popup/Toast';
import { useSelector } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const ViewComments = ({ courseId, oldComments, flag = false, setFlag }) => {
    const user = useSelector((state) => state.auth.user);
    const [comments, setComments] = useState([])
    const [commentFlag, setCommentFlag] = useState(false)
    const [openDialog, setDialog] = useState(false);
    const handleClickOpen = () => setDialog(true);
    const handleCloseDialog = () => setDialog(false);
    const [loading, setLoading] = useState(false);
    const [selectedComment, setSelectedComment] = useState();

    useEffect(() => {
        const fetchComments = async () => {
            const resp = await fetchWithToken(`${endPoints.get_by_courseId}/${courseId}`);
            const data = await resp.json();
            data.map(comment => comment.createdAt = new Date(comment.createdAt).toLocaleString())
            setComments(data);
        };
        fetchComments();
    }, [flag, commentFlag]);

    const handleDelete = async (id) => {
        setLoading(true)
        const resp = await fetchWithToken(`${endPoints.delete_comment}/${id}`, {}, 'DELETE');
        const data = await resp.json();
        Toast('info', data.message,)
        setCommentFlag(!commentFlag)
        setLoading(false);
    };


    if (comments.length == 0) {
        return <Typography textAlign={'center'} fontSize={'bold'} variant='h4'>No hay comentarios de las estudiantes</Typography>
    }

    return <>
        <>
            {oldComments ? <h3>Comentarios de otros estudiantes</h3> : <h1>Comentarios</h1>}
            {openDialog && (<Dialog
                open={openDialog}
                BackdropProps={{
                    style: { backgroundColor: "transparent" }
                }}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialog}
                describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Eliminar comentario"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Está segura de eliminar, comentar: {selectedComment.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            handleDelete(selectedComment.id);
                            handleCloseDialog();
                        }}
                    >
                        Yes
                        {loading && <ClipLoader color={"white"} size={30} />}
                    </Button>
                    <Button
                        onClick={() => {
                            handleCloseDialog();
                        }}
                    >
                        No
                    </Button>
                </DialogActions>
            </Dialog>)}

            {comments.map((comment) => <div key={comment.id} style={{ padding: 14 }} className="App">
                <Paper style={{ padding: "40px 20px" }}>
                    <Box >
                    </Box>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar alt="Remy Sharp" />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Stack direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                spacing={2} >
                                <h4 style={{ margin: 0, textAlign: "left" }}>{comment.user.username}</h4>
                                <Box
                                    sx={{
                                        width: 200,
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginLeft: 3
                                    }}
                                >
                                    <Rating
                                        name="text-feedback"
                                        value={comment.stars}
                                        readOnly
                                        precision={1}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                </Box>
                            </Stack>
                            <p style={{ textAlign: "left" }}>
                                {comment.message}
                            </p>
                            <p style={{ textAlign: "left", color: "gray" }}>
                                {comment.createdAt}
                            </p>
                            {user.role === 'admin' && < Stack >
                                <Tooltip title={openDialog ? "" : "Haga clic en el icono para eliminar"}>
                                    <IconButton onClick={() => {
                                        handleClickOpen()
                                        setSelectedComment(comment)
                                    }} color="warning">
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Stack>}
                        </Grid>
                    </Grid>
                </Paper>
            </div>)}
        </>
    </>
}

export default ViewComments;