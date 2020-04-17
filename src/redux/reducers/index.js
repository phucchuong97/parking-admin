import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import parkingListReducer from './parkingListReducer';
import parkingChangeStatusReducer from './parkingChangeStatusReducer';
import statisticsReducer from './statisticsReducer';

export default combineReducers({
  checkAuth: loginReducer,
  parking: parkingListReducer,
  changeParking: parkingChangeStatusReducer,
  statistics: statisticsReducer
});
