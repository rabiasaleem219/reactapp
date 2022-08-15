import * as React from "react";
import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { StyledMenu } from "./styles";
import { Description, Person } from "@material-ui/icons";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import CommentIcon from "@mui/icons-material/Comment";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useNavigate } from "react-router-dom";

export default function NavbarMobile() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (path) => {
    setAnchorEl(null);
    navigate(path);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          borderRadius: "50px",
          border: "2px solid #5e82be",
        }}
      >
        Options
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => handleClose("/course/description")}
          disableRipple
        >
          <Description />
          Descripcion
        </MenuItem>
        <MenuItem onClick={() => handleClose("/course/teachers")} disableRipple>
          <Person />
          Profesores
        </MenuItem>
        <MenuItem
          onClick={() => handleClose("/course/curriculum")}
          disableRipple
        >
          <VideoLibraryIcon />
          Curriculum
        </MenuItem>
        <MenuItem
          onClick={() => handleClose("/course/certificates")}
          disableRipple
        >
          <WorkspacePremiumIcon />
          Certificado
        </MenuItem>
        <MenuItem onClick={() => handleClose("/course/comments")} disableRipple>
          <CommentIcon />
          Comentarios
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
