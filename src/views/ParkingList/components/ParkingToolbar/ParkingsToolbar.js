import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Select
} from '@material-ui/core';
import { STATUS } from '../../../../common/constant';
import { connect } from 'react-redux';
import { parkingselectedStatus } from '../../../../redux/actions';
import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center'
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const ParkingToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const handleChange = event => {
    props.changeStatus(event.target.value);
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search parking"
        />
        <span className={classes.spacer} />
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">
            Parking Status
          </InputLabel>
          <Select
            id="demo-simple-select-outlined"
            label="Parking Status"
            labelId="demo-simple-select-outlined-label"
            onChange={handleChange}
            value={props.status}>
            <MenuItem value={STATUS.ALL}>
              <em>All</em>
            </MenuItem>
            <MenuItem value={STATUS.PENDING}>Pending</MenuItem>
            <MenuItem value={STATUS.CANCELED}>Canceled</MenuItem>
            <MenuItem value={STATUS.APPROVED}>Approved</MenuItem>
            <MenuItem value={STATUS.REJECT}>Rejected</MenuItem>
          </Select>
        </FormControl>
        <span className={classes.spacer} />
        <Button color="primary" variant="contained">
          Add parking
        </Button>
      </div>
    </div>
  );
};

ParkingToolbar.propTypes = {
  changeStatus: PropTypes.func,
  className: PropTypes.string,
  limit: PropTypes.number,
  offset: PropTypes.number,
  status: PropTypes.number
};
const mapStateToProps = state => {
  return {
    status: state.parking.status,
    limit: state.parking.limit,
    offset: state.parking.offset
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeStatus: status => dispatch(parkingselectedStatus(status))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParkingToolbar);
