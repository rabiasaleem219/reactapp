import React, { useState, useEffect } from "react";
import { endPoints } from 'const/endPoints';
import { fetchWithToken } from 'helpers/fetch';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "tachyons";
import Stack from '@mui/material/Stack';
import Tooltip from "@mui/material/Tooltip";
import "react-toastify/dist/ReactToastify.css";
import DeleteVideo from './Delete/Delete'
import WatchVideo from "./Watch";


const Videos = () => {

    const [flag, setFlag] = useState(true)
    const [videos, setVideos] = useState([])
    const [current, setCurrent] = useState()
    const [openD, setD] = useState(false)

    useEffect(async () => {
        const videos = await fetchWithToken(endPoints.get_all_videos, {}, 'GET')
        const data = await videos.json()
        data.map(video => {
            video.destination = JSON.parse(video.destination)
        })
        console.log(data, '')
        setVideos(data)
    }, [flag])


    if (videos.length === 0) {
        return <Typography textAlign={'center'} fontSize={'bold'} variant='h4'>No se encontraron vídeos</Typography>
    }

    return <>

        {openD && (
            <WatchVideo openD={openD} video={current} setD={setD} />
        )}
        {
            videos.map((video, index) => {
                return (
                    <Card key={index} className="dib " sx={{ maxWidth: 300, p: 3, m: 3, maxHeight: 300 }}>
                        <Tooltip title="Click to watch video">
                            <CardActionArea onClick={() => { setD(true); setCurrent(video) }}>
                                <CardMedia
                                    component="video"
                                    height="150"
                                    image={video.destination[3].url}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom component="div">
                                        {video.originalname}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Tooltip>
                        <Stack direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}>
                            <DeleteVideo video={video} flag={flag} setFlag={setFlag} />
                        </Stack>
                    </Card>
                )
            })
        }

    </>
}

export default Videos