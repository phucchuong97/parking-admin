import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import parkingReducer from './parkingReducer';

export default combineReducers({
  checkAuth:loginReducer,
  parking: parkingReducer
});
