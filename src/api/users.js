import axios from 'axios';
import { SERVER } from '../common/constant';
const ROUTE = {
  LIST_USER: 'api/admin/users',
  BLOCK_UNLOCK: 'api/admin/users/'
};

const setToken = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  let token = 'Token ';
  if (userData) token = token + userData.token;
  axios.defaults.headers.common['Authorization'] = token;
};

const getListUser = () => {
  setToken();
  const URL = SERVER + ROUTE.LIST_USER;
  return axios.get(URL);
};

const blockUnlock = (status, userID) => {
  setToken();
  const URL = SERVER + ROUTE.BLOCK_UNLOCK + userID;
  return axios.put(URL, {
    isBlock: status
  });
};

export { getListUser, blockUnlock };
