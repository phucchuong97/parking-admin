import axios from 'axios';
import { SERVER } from '../common/constant';
const ROUTE = {
  USER_PARKING: 'api/api/statistics'
};

const setToken = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  let token = 'Token ';
  if (userData) token = token + userData.token;
  axios.defaults.headers.common['Authorization'] = token;
};

const getUserParkingNum = () => {
  setToken();
  const URL = SERVER + ROUTE.USER_PARKING;
  return axios.get(URL);
};

export { getUserParkingNum };
