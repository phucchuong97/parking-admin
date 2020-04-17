import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  IconButton,
  Grid,
  Typography,
  LinearProgress
} from '@material-ui/core';
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
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  }
}));

const ParkingList = props => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const {
    status,
    offset,
    limit,
    fetchParkingList,
    loading,
    total,
    changePage
  } = props;

  useEffect(() => {
    fetchParkingList(offset, status, limit);
  }, [status, offset, limit]);
  const handleChangePage = offset => {
    changePage(offset);
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
              <LinearProgress />
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
      {loading ? (
        ''
      ) : (
        <div className={classes.pagination}>
          <Typography variant="h5">
            {offset + 1}-{offset + limit < total ? offset + limit : total} of{' '}
            {total}
          </Typography>
          <IconButton
            disabled={offset - limit <= 0}
            onClick={() => handleChangePage(offset - limit)}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            disabled={offset + limit >= total}
            onClick={() => handleChangePage(offset + limit)}>
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
