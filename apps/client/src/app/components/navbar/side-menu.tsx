import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import Newspaper from '@mui/icons-material/Newspaper';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import GamesIcon from '@mui/icons-material/Games';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <div>
    <Link to={'/home'}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Main Page" />
      </ListItem>
    </Link>
    <Link to='/news'>
      <ListItem button>
        <ListItemIcon>
          <Newspaper />
        </ListItemIcon>
        <ListItemText primary="News" />
      </ListItem>
    </Link>
    <Link to="/friends">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Drinking Companions" />
      </ListItem>
    </Link>
    <Link to="/messages">
      <ListItem button>
        <ListItemIcon>
          <MessageIcon />
        </ListItemIcon>
        <ListItemText primary="Messages" />
      </ListItem>
    </Link>
    <Link to="/music">
      <ListItem button>
        <ListItemIcon>
          <LibraryMusicIcon />
        </ListItemIcon>
        <ListItemText primary="Music" />
      </ListItem>
    </Link>
    <Link to="/video">
      <ListItem button>
        <ListItemIcon>
          <VideoCameraBackIcon />
        </ListItemIcon>
        <ListItemText primary="Video" />
      </ListItem>
    </Link>
    <Link to="/peoples">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="All Alcoholics" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <Link to="applications">
    <ListItem button>
      <ListItemIcon>
        <GamesIcon />
      </ListItemIcon>
      <ListItemText primary="Applications" />
    </ListItem>
    </Link>
    <Link to="settings">
    <ListItem button>
      <ListItemIcon>
        <SettingsApplicationsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
    </Link>
  </div>
);
