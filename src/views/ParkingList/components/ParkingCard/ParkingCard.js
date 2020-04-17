import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Button,
  Modal,
  CardHeader,
  Avatar
} from '@material-ui/core';
//import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { getDuringTimeFromNow } from '../../../../helpers/timeHelper';
import ParkingDetail from '../ParkingDetail';
import { parkingChangeStatus } from '../../../../redux/actions';
import { connect } from 'react-redux';
import { STATUS } from '../../../../common/constant';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  root: {},
  cardPadding: {
    padding: 8
  },
  imageContainer: {
    height: 128,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6
  },
  image: {
    'background-size': 'cover'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial'
  }
}));

const ParkingCard = props => {
  const { className, parking } = props;
  const classes = useStyles();
  const [openParkingDetail, setOpenParkingDetail] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  props.errorMessage &&
    enqueueSnackbar(props.errorMessage, { variant: 'error' });

  const handleOpen = bool => {
    setOpenParkingDetail(bool);
  };

  return (
    <>
      <Card className={clsx(classes.root, className)}>
        <CardHeader
          action={
            <>
              <Button onClick={() => handleOpen(true)} variant="outlined">
                Detail
              </Button>{' '}
            </>
          }
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={parking.userID.avatar || '/images/avatars/avatar_11.png'}
            />
          }
          subheader={getDuringTimeFromNow(parking.createdAt)}
          title={parking.userID.email}
        />
        <CardContent className={clsx(classes.cardPadding)}>
          <div className={classes.imageContainer}>
            <img
              alt="parking"
              className={classes.image}
              src={
                parking.image ||
                'https://d27p8o2qkwv41j.cloudfront.net/wp-content/uploads/2017/10/shutterstock_521926666-e1508347182482.jpg'
              }
            />
          </div>
          <Typography align="center" variant="h6" alignItems="center">
            {parking.name}
          </Typography>
        </CardContent>
        <Divider />
        {parking.status === STATUS.CANCELED ? (
          ''
        ) : parking.status === STATUS.PENDING ? (
          <CardActions>
            <Grid container justify="space-between">
              <Grid>
                <Button
                  onClick={() =>
                    props.parkingChangeStatus(STATUS.REJECT, parking._id)
                  }
                  variant="outlined">
                  Reject
                </Button>
              </Grid>
              <Grid>
                <Button
                  color="primary"
                  onClick={() =>
                    props.parkingChangeStatus(STATUS.APPROVED, parking._id)
                  }
                  variant="contained">
                  Approve
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        ) : parking.status === STATUS.APPROVED ? (
          <CardActions>
            <Grid container justify="space-between">
              <Grid>
                <Button
                  onClick={() =>
                    props.parkingChangeStatus(STATUS.REJECT, parking._id)
                  }
                  variant="outlined">
                  Reject
                </Button>
              </Grid>
              <Grid>
                <Button
                  color="primary"
                  onClick={() =>
                    props.parkingChangeStatus(STATUS.PENDING, parking._id)
                  }
                  variant="outlined">
                  Pendding
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        ) : (
          <CardActions>
            <Grid container justify="space-between">
              <Grid>
                <Button
                  onClick={() =>
                    props.parkingChangeStatus(STATUS.PENDING, parking._id)
                  }
                  variant="outlined">
                  Pendding
                </Button>
              </Grid>
              <Grid>
                <Button
                  color="primary"
                  onClick={() =>
                    props.parkingChangeStatus(STATUS.APPROVED, parking._id)
                  }
                  variant="contained">
                  Approve
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        )}
      </Card>
      <Modal onClose={() => handleOpen(false)} open={openParkingDetail}>
        {<ParkingDetail open={handleOpen} parking={parking} />}
      </Modal>
    </>
  );
};

ParkingCard.propTypes = {
  changing: PropTypes.bool,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  parking: PropTypes.object.isRequired,
  parkingChangeStatus: PropTypes.func,
  parkingData: PropTypes.object
};

const mapStateToProps = state => {
  return {
    parkingData: state.changeParking.data,
    errorMessage: state.changeParking.message,
    changing: state.changeParking.changing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    parkingChangeStatus: (status, parkingID) =>
      dispatch(parkingChangeStatus(status, parkingID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParkingCard);
