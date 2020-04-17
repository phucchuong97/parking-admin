import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import parkingListReducer from './parkingListReducer';
import parkingReducer from './parkingReducer';
import statisticsReducer from './statisticsReducer';

export default combineReducers({
  checkAuth: loginReducer,
  parking: parkingListReducer,
  changeParking: parkingReducer,
  statistics: statisticsReducer
});
