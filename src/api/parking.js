import axios from 'axios';
import { SERVER } from '../common/constant';
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

const getList = () => {
  setToken();
  const URL = SERVER + ROUTE.LIST_PARKING;
  return axios.get(URL);
};

const approve = (status, parkingID) => {
  setToken();
  const URL = SERVER + ROUTE.PARKING + parkingID;
  return axios.put(URL, {
    isBlock: status
  });
};

const remove = parkingID => {
  setToken();
  const URL = SERVER + ROUTE.REMOVE + parkingID;
  return axios.delete(URL);
};

export { getList, approve, remove };
