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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Badge, Fab, Menu, MenuItem } from '@mui/material';
import {
  AccountCircle,
  Notifications as NotificationsIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import appActions from 'store/actions/app';
import AddClassroomDialog from 'containers/Main/AddClassroomDialog';
import Socket from 'socket';
import events from 'socket/events';
import classroomActions from 'store/actions/classroom';
import Utils from 'utils';

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

export default function MiniDrawer() {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [openAddClassroomDilaog, setOpenAddClassroomDialog] =
    React.useState(false);
  const user = useSelector((state) => state.app.user);
  const userFullName = Utils.getFullName(user);
  const userInitials = Utils.getInitials(userFullName);
  const authenticated = useSelector((state) => state.app.authenticated);
  const location = useLocation();
  const showFab =
    location.pathname === '/dashboard' && user.role === 'instructor';

  React.useEffect(() => {
    console.log('in useEffect', { authenticated });
    if (authenticated) {
      Socket.on(events.CONNECT, () => {
        console.log('SOCKET CONNECTED', Socket.getInstance().id);
      });
      Socket.on(events.MESSAGE, (data) => {
        console.log('message', data);
        dispatch({
          type: classroomActions.addMessage,
          classroomUuid: data.classroomUuid,
          message: data,
        });
      });
    } else {
      Socket.removeAllListeners();
      Socket.disconnect();
    }
    return () => {
      console.log('Unmounting');
      Socket.removeAllListeners();
      Socket.disconnect();
    };
  }, [dispatch, authenticated]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCloseAddClassroomDialog = () => {
    setOpenAddClassroomDialog(false);
  };

  const handleOpenAddClassroomDialog = () => {
    setOpenAddClassroomDialog(true);
  };

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = React.useState(null);
  const openProfileMenu = Boolean(profileMenuAnchorEl);
  const handleProfileClick = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleSignOut = () => {
    setProfileMenuAnchorEl(null);
    sessionStorage.clear();
    sessionStorage.clear();
    dispatch({
      type: appActions.signOut,
    });
    dispatch({
      type: classroomActions.signOut,
    });
    navigate('/signin');
  };

  return (
    <Box sx={{ display: 'flex' }} className="dashboard">
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/dashboard')}
          >
            Online Learning
          </Typography>
          <Box style={{ flexGrow: 1 }} />
          <Box>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileClick}
            >
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  fontSize: '12px',
                  backgroundColor: Utils.stringToColor(userFullName),
                  backgroundBlendMode: 'darken',
                }}
              >
                {userInitials}
              </Avatar>
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={profileMenuAnchorEl}
              open={openProfileMenu}
              onClose={handleProfileClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleProfileClose}>
                <ListItemIcon>
                  <ManageAccountsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Account Settings</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Sign Out</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
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
          {['Classes', 'Exams', 'Grades'].map((text, index) => (
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          {['Settings', 'Profile'].map((text, index) => (
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
      {showFab && (
        <Fab
          onClick={handleOpenAddClassroomDialog}
          color="primary"
          className="fab"
        >
          <AddIcon />
        </Fab>
      )}
      <AddClassroomDialog
        open={openAddClassroomDilaog}
        onClose={handleCloseAddClassroomDialog}
      />
    </Box>
  );
}
