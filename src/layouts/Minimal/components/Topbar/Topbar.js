import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar , Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none'
  },
  TextLogo:{
    marginTop: theme.spacing(1),
    color: theme.palette.white
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/dashboard">
          <Typography 
            className={[classes.title, classes.TextLogo]}
            gutterBottom
            variant="h4">
              Parking Sharing Web Admin
          </Typography>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
