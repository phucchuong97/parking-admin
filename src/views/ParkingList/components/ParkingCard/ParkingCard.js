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

const useStyles = makeStyles(theme => ({
  root: {},
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
    'background-size':'cover'
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
  const { className, parking: parking, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Link>
        <CardContent>        
          <div className={classes.imageContainer}>
            <img
              alt="parking"
              className={classes.image}
              src={parking.imageUrl}
            />
          </div>
          <Typography
            align="center"
            variant="h6"
          >
            {parking.title}
          </Typography>       
        </CardContent>
      </Link>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              2hr ago
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <Button
              color="success"
              variant="outlined"
            > 
              Hide
            </Button>
            
            <Button
              color="primary"
              variant="outlined"
            > 
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
