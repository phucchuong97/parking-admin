import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { connect } from 'react-redux';
import { logedIn } from '../../../../redux/actions';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  TextLogo: {
    marginTop: theme.spacing(1),
    color: theme.palette.white
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  const logout = () => {
    localStorage.removeItem('user');
    props.logedIn(false);
  };

  return (
    <AppBar className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/dashboard">
          <Typography
            className={clsx(classes.title, classes.TextLogo)}
            gutterBottom
            variant="h4">
            Parking Sharing Web Admin
          </Typography>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={logout}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  isLogedOut: PropTypes.func,
  logedIn: PropTypes.func,
  onSidebarOpen: PropTypes.func
};

export default connect(null, { logedIn })(Topbar);
