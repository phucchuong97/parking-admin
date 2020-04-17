import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Typography,
  Grid,
  Divider,
  Button,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions
} from '@material-ui/core';
//import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { getDuringTimeFromNow } from '../../../../helpers/timeHelper';
import { makeStyles } from '@material-ui/styles';
//import GoogleMapReact from 'google-map-react';
//import { MAP_KEY, STATUS } from '../../../../common/constant';
import { parkingChangeStatus } from '../../../../redux/actions';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {},
  cardPadding: {
    padding: 6
  },
  imageContainer: {
    height: 300,
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
  },
  modal: {
    position: 'absolute',
    width: 800,
    height: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'scroll'
  },
  avatar: {
    width: 60,
    height: 60
  }
}));

const ParkingDetail = props => {
  const { parking } = props;
  const classes = useStyles();
  const { location } = parking;

  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  return (
    <div className={classes.modal}>
      <Card>
        <CardHeader
          action={
            <Button onClick={() => props.open(false)} variant="outlined">
              Close
            </Button>
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
          <Typography align="center" variant="h6">
            {parking.name}
          </Typography>
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
          <Typography>Description: {parking.description}</Typography>
          <Typography>Address: {parking.street}</Typography>
          <Typography>Capacity: {parking.capacity}</Typography>

          {/*<div style={{ height: '200px', width: '50%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: MAP_KEY }}
              defaultCenter={{
                center: {
                  lat: location.latitude,
                  lng: location.longitude
                }
              }}
              defaultZoom={10}
              yesIWantToUseGoogleMapApiInternals>
              <AnyReactComponent
                lat={location.latitude}
                lng={location.longitude}
                text={parking.name}
              />
            </GoogleMapReact>
            </div>*/}
        </CardContent>
        <Divider />
        {parking.status === STATUS.CANCELED ? (
          <CardActions>
            <Grid container justify="space-between">
              <Grid>
                <Button
                  onClick={() => console.log('delete')}
                  variant="outlined">
                  Delete
                </Button>
              </Grid>
            </Grid>
          </CardActions>
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
    </div>
  );
};

ParkingDetail.propTypes = {
  parking: PropTypes.object
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

export default connect(mapStateToProps, mapDispatchToProps)(ParkingDetail);
