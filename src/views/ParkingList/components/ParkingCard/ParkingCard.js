import React from 'react';
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
  Link
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { getDuringTimeFromNow } from '../../../../helpers/timeHelper';

const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer'
  },
  cardPadding: {
    padding: 8,
    paddingBottom: 0
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
  }
}));

const ParkingCard = props => {
  const { className, parking, ...rest } = props;
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.cardPadding}>
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
        <Typography align="center" variant="h6">
          {parking.name}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              {getDuringTimeFromNow(parking.createdAt)}
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            <Button color="primary" variant="outlined">
              Hide
            </Button>

            <Button color="primary" variant="contained">
              Approve
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

ParkingCard.propTypes = {
  className: PropTypes.string,
  parking: PropTypes.object.isRequired
};

export default ParkingCard;
