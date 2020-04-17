import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PropTypes from 'prop-types';

import { ParkingToolbar, ParkingCard } from './components';
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { parkingGetList, parkingselectedOffset } from '../../redux/actions';
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
    props.fetchParkingList(props.offset, props.status, props.limit);
  }, [props.status, props.offset]);
  useEffect(() => {}, []);
  const handleChangePage = offset => {
    props.changePage(offset);
  };

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
      {props.loading ? (
        ''
      ) : (
        <div className={classes.pagination}>
          <Typography variant="h5">
            {props.offset + 1}-
            {props.offset + props.limit < props.total
              ? props.offset + props.limit
              : props.total}{' '}
            of {props.total}
          </Typography>
          <IconButton
            disabled={props.offset - props.limit <= 0}
            onClick={() => handleChangePage(props.offset - props.limit)}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            disabled={props.offset + props.limit >= props.total}
            onClick={() => handleChangePage(props.offset + props.limit)}>
            <ChevronRightIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

ParkingList.propTypes = {
  changePage: PropTypes.func,
  errorMessage: PropTypes.string,
  fetchParkingList: PropTypes.func,
  limit: PropTypes.number,
  loading: PropTypes.bool,
  offset: PropTypes.number,
  parkingData: PropTypes.array,
  status: PropTypes.number,
  total: PropTypes.number
};

const mapStateToProps = state => {
  return {
    parkingData: state.parking.data,
    errorMessage: state.parking.message,
    limit: state.parking.limit,
    loading: state.parking.loading,
    total: state.parking.total,
    offset: state.parking.offset,
    status: state.parking.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchParkingList: (offset, status, limit) =>
      dispatch(parkingGetList(offset, status, limit)),
    changePage: offset => dispatch(parkingselectedOffset(offset))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParkingList);
