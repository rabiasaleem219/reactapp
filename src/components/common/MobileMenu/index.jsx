import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import menuLogo from "../../../assets/images/profile-menu.svg";
import menuLogoBlue from "../../../assets/images/profile-menu-blue.svg";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { startLogout } from "../../../actions/auth";

export default function MobileMenu() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    dispatch(startLogout());
    setTimeout(() => {
      navigate("/");
    }, 2100);
    handleClose();
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "1rem",
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="large"
            sx={{ ml: 2, transition: "all 0.3s ease-in-out" }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <img src={menuLogo} alt="Menu" />
          </IconButton>
        </Tooltip>
      </Box>

      {user ? (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 13px 36px rgba(23, 10, 162, 0.1))",
              borderRadius: "10px",
              mt: 0,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <MenuItem
            sx={{
              justifyContent: "end",
              marginBottom: "1.2rem",
              "&:hover": {
                backgroundColor: "#fff",
              },
            }}
          >
            <img src={menuLogoBlue} alt="logo" />
          </MenuItem>
          <MenuItem
            onClick={() => navigate("/")}
            sx={{
              justifyContent: "end",
              fontSize: "1rem",
              color: "#767676",
              padding: "0.5rem 3rem 0.5rem 3rem ",
              fontWeight: "500",
              fontFamily: "helvetica",
              "&:hover": {
                color: "#5e82be",
              },
            }}
          >
            Home
          </MenuItem>
          <MenuItem
            onClick={() => navigate("/courses")}
            sx={{
              justifyContent: "end",
              fontSize: "1rem",
              color: "#767676",
              padding: "0.5rem 3rem 0.5rem 3rem ",
              fontWeight: "500",
              fontFamily: "helvetica",
              "&:hover": {
                color: "#5e82be",
              },
            }}
          >
            Cursos
          </MenuItem>
          <MenuItem
            onClick={() => navigate("/contact")}
            sx={{
              justifyContent: "end",
              fontSize: "1rem",
              color: "#767676",
              padding: "0.5rem 3rem 0.5rem 3rem ",
              fontWeight: "500",
              fontFamily: "helvetica",
              "&:hover": {
                color: "#5e82be",
              },
            }}
          >
            Contacto
          </MenuItem>
          <Divider
            sx={{
              backgroundColor: "#5e82be",
              width: "70%",
              margin: "0.5rem auto",
            }}
          />
          <MenuItem
            onClick={() => navigate("/profile/courses")}
            sx={{
              justifyContent: "end",
              fontSize: "1rem",
              color: "#767676",
              padding: "0.5rem 3rem 0.5rem 3rem ",
              fontWeight: "500",
              fontFamily: "helvetica",
              "&:hover": {
                color: "#5e82be",
              },
            }}
          >
            <Avatar
              sx={{
                marginRight: "0.5rem",
              }}
            />
            {user.username}
          </MenuItem>
          <MenuItem
            onClick={() => navigate("/profile/scores")}
            sx={{
              paddingLeft: "1rem",
              justifyContent: "end",
              fontSize: "1rem",
              color: "#767676",
              padding: "0.5rem 3rem 0.5rem 3rem ",
              fontWeight: "500",
              fontFamily: "helvetica",
              "&:hover": {
                color: "#5e82be",
              },
            }}
          >
            Mis calificaciones
          </MenuItem>
          <MenuItem
            sx={{
              paddingLeft: '1rem',
              justifyContent: 'end',
              fontSize: '1rem',
              color: '#767676',
              padding: '0.5rem 3rem 0.5rem 3rem ',
              fontWeight: '500',
              fontFamily: 'helvetica',
              '&:hover': {
                color: '#5e82be',
              },
            }}
            onClick={() => navigate('/profile/payments')}
          >
            Mis Pagos
          </MenuItem>
          <MenuItem
            onClick={() => navigate("/profile/edit")}
            sx={{
              justifyContent: "end",
              fontSize: "1rem",
              color: "#767676",
              padding: "0.5rem 3rem 0.5rem 3rem ",
              fontWeight: "500",
              fontFamily: "helvetica",
              "&:hover": {
                color: "#5e82be",
              },
            }}
          >
            Editar perfil
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            sx={{
              justifyContent: "end",
              marginBottom: "0.5rem",
              fontSize: "1rem",
              color: "#767676",
              padding: "0.5rem 3rem 0.5rem 3rem ",
              fontWeight: "500",
              fontFamily: "helvetica",
              "&:hover": {
                color: "#5e82be",
              },
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 13px 36px rgba(23, 10, 162, 0.1))",
              borderRadius: "10px",
              mt: 0,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <MenuItem
            sx={{
              justifyContent: "end",
              marginBottom: "1.2rem",
              "&:hover": {
                backgroundColor: "#fff",
              },
            }}
          >
            <img src={menuLogoBlue} alt="logo" />
          </MenuItem>
          <MenuItem
            onClick={() => navigate("/access/login")}
            sx={{
              justifyContent: "end",
              fontSize: "1rem",
              color: "#767676",
              padding: "0.5rem 3rem 0.5rem 3rem ",
              fontWeight: "500",
              fontFamily: "helvetica",
              "&:hover": {
                color: "#5e82be",
              },
            }}
          >
            Iniciar sesión
          </MenuItem>
          <MenuItem
            onClick={() => navigate("/access/register")}
            sx={{
              justifyContent: "end",
              fontSize: "1rem",
              color: "#767676",
              padding: "0.5rem 3rem 0.5rem 3rem ",
              fontWeight: "500",
              fontFamily: "helvetica",
              "&:hover": {
                color: "#5e82be",
              },
            }}
          >
            Registrarse
          </MenuItem>
          <Divider
            sx={{
              backgroundColor: "#5e82be",
              width: "70%",
              margin: "0.5rem auto",
            }}
          />
          <MenuItem
            onClick={() => navigate("/")}
            sx={{
              paddingLeft: "1rem",
              justifyContent: "end",
              fontSize: "1rem",
              color: "#767676",
              padding: "0.5rem 3rem 0.5rem 3rem ",
              fontWeight: "500",
              fontFamily: "helvetica",
              "&:hover": {
                color: "#5e82be",
              },
            }}
          >
            Home
          </MenuItem>
          <MenuItem
            sx={{
              justifyContent: "end",
              fontSize: "1rem",
              color: "#767676",
              padding: "0.5rem 3rem 0.5rem 3rem ",
              fontWeight: "500",
              fontFamily: "helvetica",
              "&:hover": {
                color: "#5e82be",
              },
            }}
          >
            Cursos
          </MenuItem>
          <MenuItem
            onClick={() => navigate("/contact")}
            sx={{
              justifyContent: "end",
              marginBottom: "1.2rem",
              fontSize: "1rem",
              color: "#767676",
              padding: "0.5rem 3rem 0.5rem 3rem ",
              fontWeight: "500",
              fontFamily: "helvetica",
              "&:hover": {
                color: "#5e82be",
              },
            }}
          >
            Contacto
          </MenuItem>
        </Menu>
      )}
    </React.Fragment>
  );
}
