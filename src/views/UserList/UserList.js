import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import { getListUser } from '../../api/users';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
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

const UserList = () => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const pag = { total: 0, limit: 10, offset: 0 };
  const [pagination, setPagination] = useState(pag);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getListUser()
      .then(response => {
        setUsers(response.data.users);
        const {total, limit, offset} = response.data;
        const pag = {total, limit, offset};
        setPagination(pag);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        {isLoading ? (
          <div className={classes.progress}>
            <CircularProgress />
          </div>
        ) : (
          <UsersTable
            data={users}
            pagination={pagination}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;
