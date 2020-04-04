import axios from 'axios' ;
const SERVER = 'https://35.187.241.117/';
const LOGIN_ROUTE = 'api/admin/login';

const login = (formValue)=>{
  const URL = SERVER + LOGIN_ROUTE;
  return axios.post(URL, {'user':formValue});
}

export {login}