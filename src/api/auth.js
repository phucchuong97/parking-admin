import axios from 'axios' ;
const SERVER = 'https://35.187.241.117/';
const ROUTE = {
  LOGIN: 'api/admin/login',
  CHECK_TOKEN: 'api/user',

};
const userData = JSON.parse(localStorage.getItem('user'));

const login = (formValue)=>{
  const URL = SERVER + ROUTE.LOGIN;
  return axios.post(URL, {'user':formValue});
}

const checkLogined = ()=>{
  const URL = SERVER + ROUTE.CHECK_TOKEN;
  const token = 'Token '+userData.token;
  return axios.get(URL, {headers: {'Authorization': token}});
}

const isAuth = async ()=>{
  if(!userData) return false;
  let ans = false;
  await checkLogined().then(respone=>{
    console.log(respone.data);
    ans = true;
  }).catch(error=>{
    console.log(error.respone);
  })
  return ans;
}

export {login, isAuth}