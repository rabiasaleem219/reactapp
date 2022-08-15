import React, { useState, useEffect } from 'react';
import {
  Container2,
  HeaderList,
  ImgContainer,
  List,
  SectionContainer,
  Text,
  Title,
  VideoList,
  VideoTitle,
} from './styles';
import ReactPlayer from 'react-player';
import ClassRoomItems from 'components/layout/ClassroomItems';
import { Box, Button } from '@mui/material';
import { fetchWithToken } from 'helpers/fetch';
import { endPoints } from 'const/endPoints';
import Toast from 'components/common/Popup/Toast';
import DownloadIcon from '@mui/icons-material/Download';
import Stack from '@mui/material/Stack';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DescriptionIcon from '@mui/icons-material/Description';
var FileSaver = require('file-saver');

export const VideoLesson = ({
  lesson,
  lessonsAndQuizzes,
  date,
  cleanTitle,
  lessonId,
  section,
  course,
  resources
}) => {

  const [currentLink, setCurrentLink] = useState('')
  const [links, setLinks] = useState([])
  const [header, setHeader] = useState('video')
  const handleCertificate = async () => {
    const resp = await fetchWithToken(
      `${endPoints.get_certificate}/${course.id}`
    );
    const body = await resp.json();
    if (resp.status === 200) {
      Toast('success', body.message);
    } else {
      Toast('error', body.message);
    }
  };

  useEffect(async () => {
    setCurrentLink('')
    setLinks([])
    const resp = await fetchWithToken(`${endPoints.get_video_by_lesson}/${lessonId}`)
    const data = await resp.json();
    setCurrentLink(data.links[0])
    setLinks(data.links)
  }, [lessonId])

  const handleResource = async (item) => {
    FileSaver.saveAs(item.path, item.filename)
    Toast('success', "Resource Downloaded successfully");
  }

  const handleResolution = (index) => {
    setCurrentLink(links[index])
  }
  // const firstNextLesson = nextSection[0];
  // const newType = type === 'clase' ? 'clase' : 'quiz';

  // const nextPath =
  //   firstNextLesson &&
  //   `/course/classroom/${cleanTitle}/${newType}/${firstNextLesson.id}`;
  return (
    <Box
      sx={{
        height: 'calc(100vh - 84px)',
        backgroundColor: ' #f8f8f8',
      }}
    >
      <SectionContainer>
        <ImgContainer>
          <ReactPlayer
            url={currentLink.url}
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
            config={{
              file: {
                attributes: {
                  autoPlay: false,
                },
              },
            }}
          />
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            marginTop="10px"
          >
            {
              links.map((link, index) => {
                return <Button key={index} variant='contained' size="medium" color={currentLink.name === link.name ? "success" : "primary"}
                  onClick={() => handleResolution(index)}>{link.name} px
                </Button>
              })
            }
          </Stack>
          <VideoTitle>
            <h1>{lesson.name}</h1>
            <h2>{date}</h2>
          </VideoTitle>
        </ImgContainer>
        <VideoList>
          <HeaderList>
            <Title>
              <h1>{section.name}</h1>
            </Title>
            <Text>
              <h5><Button variant="simple" onClick={() => setHeader('video')}>Video</Button></h5>
              <h5><Button variant="simple" onClick={() => setHeader('resource')}>Recursos</Button></h5>
            </Text>
          </HeaderList>
          {header === 'video' ? <List>
            {lessonsAndQuizzes.map((item, index) => {
              const lessonType = item.status ? 'quiz' : 'clase';
              return (
                <ClassRoomItems
                  key={index}
                  type={lessonType}
                  courseTitle={cleanTitle}
                  lessonId={lessonId}
                  item={item}
                />
              );
            })}
          </List> :
            <List>
              <Stack direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                {resources.map((item, index) => {
                  return (
                    <div key={index}>
                      <Stack direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <DescriptionIcon color="primary" />
                        <Button onClick={() => handleResource(item)}>{item.filename}<DownloadIcon color="success" /></Button>
                      </Stack>
                    </div>
                  );
                })}
              </Stack>
            </List>
          }
        </VideoList>
      </SectionContainer>
      <Container2>
        {/* <Button text="Obtener Certificado" onClick={handleCertificate}>Hello</Button> */}
        {/* <ButtonSection>
          <h2>Quiz 1</h2>
          <Button
            text={<ArrowForwardIcon fontSize="medium" />}
            padding="9px 11px"
            borderRadius="50%"
            shadow="0px 13px 56px  rgba(82, 124, 182, 0.71)"
            path={nextPath}
          />
        </ButtonSection> */}
      </Container2>
    </Box >
  );
};
