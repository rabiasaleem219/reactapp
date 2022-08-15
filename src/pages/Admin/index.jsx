import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonIcon from '@mui/icons-material/Person';
import PaidIcon from '@mui/icons-material/Paid';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import EmailIcon from '@mui/icons-material/Email';
import { Outlet } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import TokenIcon from '@mui/icons-material/Token';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Admin() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const routes = {
    Cursos: () => navigate('/admin/courses'),
    Usuarios: () => navigate('/admin/users'),
    Pagos: () => navigate('/admin/payments'),
    Estadisticas: () => navigate('/admin/stats'),
    Emails: () => navigate('/admin/Emails'),
    Multimedia: () => navigate('/admin/media'),
    Anuncios: () => navigate('/admin/advertisements'),
    Blogs: () => navigate('/admin/blogs'),
    Noticias: () => navigate('/admin/news'),
    Cupones: () => navigate('/admin/coupons'),
    Videos: () => navigate('/admin/videos'),
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  //* obtener ruta actual
  const path = useParams();
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#f8f8f8',
        height: '100vh',
        overflowY: 'scroll',
        // scroll bar custom
        '::-webkit-scrollbar': {
          width: '0.4em',
        },
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          // background: "rgb(88, 102, 173)",
          background:
            'linear-gradient(90deg, #5866ad 0%, #5389b8 55%,#37b0cf 100%)',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            sx={{ transition: 'all 0.2s ease-in-out', justifySelf: 'flex-end' }}
            variant="h6"
            noWrap
            component="div"
          >
            Administrador
          </Typography>
          <Box
            onClick={() => navigate('/')}
            sx={{
              padding: '0.3rem',
              '&:hover': {
                cursor: 'pointer',
                borderBottom: '1px solid #fff',
                transition: 'all 0.2s ease-in-out',
              },
            }}
          >
            Inicio
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ margin: '0px 0px 0px 0px' }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Cursos', 'Usuarios', 'Pagos', 'Estadisticas', "Emails", "Cupones", "Videos"].map(
            (text, index) => (
              <ListItemButton
                key={text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={routes[text]}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {text === 'Cursos' && <LibraryBooksIcon />}
                  {text === 'Usuarios' && <PersonIcon />}
                  {text === 'Pagos' && <PaidIcon />}
                  {text === 'Estadisticas' && <QueryStatsIcon />}
                  {text === 'Emails' && <EmailIcon />}
                  {text === 'Cupones' && <TokenIcon />}
                  {text === 'Videos' && <VideoLibraryIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            )
          )}
        </List>
        <Divider />
        {/* <List>
          {['Emails', 'Multimedia', 'Anuncios', 'Blogs', 'Noticias'].map(
            (text, index) => (
              <ListItemButton
                key={text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={routes[text]}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {text === 'Emails' && <EmailIcon />}
                  {text === 'Multimedia' && <PermMediaIcon />}
                  {text === 'Anuncios' && <AnnouncementIcon />}
                  {text === 'Blogs' && <FaBlog />}
                  {text === 'Noticias' && <NewspaperIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            )
          )}
        </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, background: '#f8f8f8' }}>
        <DrawerHeader />
        {path['*'] === '' && (
          <h2
            style={{
              textAlign: 'center',
              marginTop: '20px',
              color: 'c0c0e0',
            }}
          >
            Escoge una opcion en el menú
          </h2>
        )}
        <Outlet />
      </Box>
    </Box>
  );
}
