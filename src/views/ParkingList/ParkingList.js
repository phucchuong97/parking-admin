import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PropTypes from 'prop-types';

import { ParkingToolbar, ParkingCard } from './components';
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { parkingGetList } from '../../redux/actions';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  progress: {
    position: 'relative',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    width: '100px',
    height: '100px'
  }
}));

const ParkingList = props => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    props.fetchParkingList();
  }, []);

  return (
    <div className={classes.root}>
      <ParkingToolbar />
      {props.errorMessage &&
        enqueueSnackbar(props.errorMessage, { variant: 'error' })}
      <div className={classes.content}>
        <Grid container spacing={2}>
          {props.loading ? (
            <div className={classes.progress}>
              <CircularProgress />
            </div>
          ) : (
            props.parkingData.map(p => (
              <Grid item key={p._id} lg={4} md={4} xs={6}>
                <ParkingCard parking={p} />
              </Grid>
            ))
          )}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

ParkingList.propTypes = {
  errorMessage: PropTypes.string,
  fetchParkingList: PropTypes.func,
  loading: PropTypes.bool,
  parkingData: PropTypes.array
};

const mapStateToProps = state => {
  return {
    parkingData: state.parking.data,
    errorMessage: state.parking.message,
    loading: state.parking.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchParkingList: () => dispatch(parkingGetList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParkingList);
