import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import {
  TotalParking,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestBookings,
  LatestParkingRegisters
} from './components';
import { connect } from 'react-redux';
import { statisticsGetUserParkingNum } from '../../redux/actions';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = props => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  props.errorMessage &&
    enqueueSnackbar(props.errorMessage, { variant: 'error' });

  useEffect(() => {
    props.fetchStatistics();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalParking parkingNum={props.data.totalParking} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalUsers userNum={props.data.totalUser} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TasksProgress />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalProfit />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <LatestSales />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <UsersByDevice />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <LatestParkingRegisters />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <LatestBookings />
        </Grid>
      </Grid>
    </div>
  );
};

Dashboard.propTypes = {
  data: PropTypes.object,
  errorMessage: PropTypes.string,
  fetchStatistics: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    loading: state.statistics.loading,
    data: state.statistics.data,
    errorMessage: state.statistics.message
  };
};

const mapDispathToProps = dispatch => {
  return {
    fetchStatistics: () => dispatch(statisticsGetUserParkingNum())
  };
};

export default connect(mapStateToProps, mapDispathToProps)(Dashboard);
