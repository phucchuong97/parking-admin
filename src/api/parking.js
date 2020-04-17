import axios from 'axios';
import { SERVER } from '../common/constant';
import { STATUS } from '../common/constant';
const ROUTE = {
  LIST_PARKING: 'api/admin/parking',
  PARKING: 'api/admin/parking/',
  REMOVE: 'api/sadmin/parking/'
};

const setToken = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  let token = 'Token ';
  if (userData) token = token + userData.token;
  axios.defaults.headers.common['Authorization'] = token;
};

const getList = (offset, status, limit) => {
  setToken();
  let URL = SERVER + ROUTE.LIST_PARKING;
  URL += '?offset=' + offset;
  URL += '&limit=' + limit;
  if (status !== STATUS.ALL) {
    URL += '&status=' + status;
  }
  return axios.get(URL);
};

const changeStatus = (status, parkingID) => {
  setToken();
  const URL = SERVER + ROUTE.PARKING + parkingID;
  return axios.put(URL, {
    status
  });
};

const remove = parkingID => {
  setToken();
  const URL = SERVER + ROUTE.REMOVE + parkingID;
  return axios.delete(URL);
};

export { getList, changeStatus, remove };
