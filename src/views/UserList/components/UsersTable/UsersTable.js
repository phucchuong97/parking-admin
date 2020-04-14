import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button,
  TableContainer
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { useSnackbar } from 'notistack';
import { getInitials } from 'helpers';
import { ROLE } from '../../../../common/constant';
import { blockUnlock } from '../../../../api/users';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  container: {
    maxHeight: 440
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const UsersTable = props => {
  const { className, data, pagination, ...rest } = props;

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [users, setUsers] = useState(data || []);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(pagination.limit);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { data } = props;
    console.log(data);
    const users = data.users || [];
    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user._id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const updateUser = user => {
    const index = users.findIndex(f => f._id == user._id);
    users[index] = user;
    setUsers(users.map(f => f));
  };

  const handleUnlockBlock = async (event, user) => {
    event.preventDefault();
    const { _id, isBlock } = user;
    blockUnlock(!isBlock, _id)
      .then(response => {
        const { data } = response;
        if (response.status == 200) {
          enqueueSnackbar((data.isBlock ? 'Blocked' : 'Unlock ') + data.email, {
            variant: 'success'
          });
        }
        updateUser(data);
      })
      .catch(error => {
        if (!error.response) {
          enqueueSnackbar('Network error', { variant: 'error' });
        } else {
          console.log(error.response);
          enqueueSnackbar(error.response.data.message, { variant: 'error' });
        }
      });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <TableContainer className={classes.container}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === users.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell>PhoneNumber</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Registration date</TableCell>
                  <TableCell>Activation</TableCell>
                  <TableCell>Block/Unlock</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(0, rowsPerPage).map(user => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user._id}
                    selected={selectedUsers.indexOf(user._id) !== -1}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(user._id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, user._id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={user.avatar || '/images/avatars/avatar_3.png'}>
                          {getInitials(user.email)}
                        </Avatar>
                        <Typography variant="body1">{user.email}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{user.phoneNumber || ''}</TableCell>
                    <TableCell>{ROLE[user.role]}</TableCell>
                    <TableCell>
                      {user.createdAt
                        ? moment(user.createdAt).format('DD/MM/YYYY')
                        : ''}
                    </TableCell>
                    <TableCell align="center">
                      {user.isActive ? (
                        <DoneIcon color="secondary" />
                      ) : (
                        <ClearIcon color="error" />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        color="primary"
                        onClick={e => handleUnlockBlock(e, user)}
                        variant={user.isBlock ? 'outlined' : 'contained'}>
                        {user.isBlock ? 'unclock' : 'block'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={users.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired
};

export default UsersTable;
