import React from 'react';
import "tachyons";
import { endPoints } from 'const/endPoints';
import { fetchWithToken } from 'helpers/fetch';
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import "tachyons";
import Toast from 'components/common/Popup/Toast';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const DeleteVideo = ({ video, flag, setFlag }) => {
    const [openDialog, setDialog] = React.useState(false);
    const handleClickOpen = () => setDialog(true);
    const handleCloseDialog = () => setDialog(false);

    const handleDelete = async (id) => {
        const resp = await fetchWithToken(`${endPoints.delete_video}/${id}`, {}, "DELETE")
        const data = await resp.json()
        console.log(data)
        if (data.status === 200 || '200') {
            Toast('success', data.message)
            setFlag(!flag)
        }
        else {
            Toast('error', data.message)
        }
    };
    return (
        <IconButton >
            <DeleteIcon onClick={handleClickOpen} />
            {openDialog && (
                <Dialog
                    open={openDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseDialog}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Eliminar video?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Está segura de eliminar {video.originalname} Video
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                handleDelete(video.id);
                                handleCloseDialog();
                            }}
                        >
                            Si

                        </Button>
                        <Button
                            onClick={() => {
                                handleCloseDialog();
                            }}
                        >
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </IconButton>
    )
}

export default DeleteVideo;