import React from "react";
import { ImgItem, TextItem } from "./style";
import { Box } from "@mui/system";
import { truncate } from "helpers/truncate";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { useNavigate, useHref } from "react-router-dom";

const ClassRoomItems = ({ type, courseTitle, lessonId, item }) => {
  const description = truncate(item.description, 100);
  const navigate = useNavigate();

  const courseTitleToUrl = courseTitle.replace(/ /g, "-").toLowerCase();
  const route = useHref(
    `/course/classroom/${courseTitleToUrl}/${type}/${item.id}`
  );

  return (
    <Box
      sx={{
        display: "flex",
        margin: "10px 0px 10px 0px",
        padding: "5px",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "rgba(0, 0, 0, 0.05)",
        },
      }}
      onClick={() => {
        // navigate to lesson page with lessonId
        navigate(route);
      }}
    >
      <ImgItem>
        {type === "clase" ? (
          <OndemandVideoIcon color="info" />
        ) : (
          <HistoryEduOutlinedIcon color="info" />
        )}
      </ImgItem>
      <TextItem>
        <h5>{item.name}</h5>
        <p>{description}</p>
      </TextItem>
    </Box>
  );
};

export default ClassRoomItems;
