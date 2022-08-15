import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ReactPlayer from 'react-player';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function WatchVideo({ video, openD, setD }) {

    const handleClose = () => {
        setD(false)
    };

    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open full-screen dialog
            </Button> */}
            <Dialog
                fullWidth
                open={openD}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {video.originalname}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <ReactPlayer
                    url={video.destination[3].url}
                    width="100%"
                    height="100%"
                    controls
                    playing
                    style={{
                        // make minimalistic player
                        objectFit: 'fill',
                        objectPosition: 'cenfter',
                        backgroundColor: '#0f0f0f',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                        border: 'none',
                    }}
                />
            </Dialog>
        </div>
    );
}
