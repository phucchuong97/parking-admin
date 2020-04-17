import {
  AUTH,
  PARKING_LOADING,
  PARKING_FETCH_ERROR,
  PARKING_FETCH_SUCCESS,
  PARKING_CHANGE_STATUS,
  PARKING_CHANGE_OFFSET,
  PARKING_CHANGE_LIMIT,
  PARKING_CHANGE_TOTAL,
  PARKING_CHANGING,
  PARKING_CHANGE_ERROR,
  PARKING_CHANGE_SUCCESS,
  STATISTICS_FETCHING_NUM_USER_PARKING,
  STATISTICS_FETCH_NUM_USER_PARKING_ERROR,
  STATISTICS_FETCH_NUM_USER_PARKING_SUCCESS
} from './type';
import { getList, changeStatus } from '../../api/parking';
import { getUserParkingNum } from '../../api/statistics';
import store from '../store';

export const logedIn = bool => ({ type: AUTH, isAuth: bool });

export const parkingHasLoadingError = message => ({
  type: PARKING_FETCH_ERROR,
  payload: message
});
export const parkingIsLoading = bool => ({
  type: PARKING_LOADING,
  payload: bool
});
export const parkingGetListSuccessfully = parking => ({
  type: PARKING_FETCH_SUCCESS,
  payload: parking
});
export const parkingparkingTotal = total => ({
  type: PARKING_CHANGE_TOTAL,
  payload: total
});
export const parkingGetList = (offset, status, limit) => {
  return dispatch => {
    dispatch(parkingIsLoading(true));
    getList(offset, status, limit)
      .then(response => {
        dispatch(parkingIsLoading(false));
        if (response.status !== 200) {
          return dispatch(parkingHasLoadingError(response.statusText));
        }
        return response;
      })
      .then(response => {
        dispatch(parkingGetListSuccessfully(response.data.parking));
        dispatch(parkingparkingTotal(response.data.total));
      })
      .catch(error => {
        let message = '';
        if (!error.response) {
          message = 'Network error!';
        } else {
          message = error.response.data.message;
        }
        dispatch(parkingHasLoadingError(message));
      });
  };
};
const parkingStatusChange = status => ({
  type: PARKING_CHANGE_STATUS,
  payload: status
});
export const parkingselectedStatus = status =>{
  return dispatch=>{
    dispatch(parkingStatusChange(status));
    dispatch(parkingselectedOffset(0));
  }
}
export const parkingselectedOffset = offset => ({
  type: PARKING_CHANGE_OFFSET,
  payload: offset
});
export const parkingselectedLimit = limit => ({
  type: PARKING_CHANGE_LIMIT,
  payload: limit
});

export const parkingChanging = bool => ({
  type: PARKING_CHANGING,
  payload: bool
});
export const parkingChangeError = message => ({
  type: PARKING_CHANGE_ERROR,
  payload: message
});
export const parkingChangeStatusSuccessfully = parking => ({
  type: PARKING_CHANGE_SUCCESS,
  payload: parking
});
export const parkingChangeStatus = (status, parkingID) => {
  return dispatch => {
    dispatch(parkingChanging(true));
    changeStatus(status, parkingID)
      .then(response => {
        dispatch(parkingChanging(false));
        if (response.status !== 200) {
          return dispatch(parkingChangeError(response.statusText));
        }
        return response;
      })
      .then(response => {
        dispatch(parkingChangeStatusSuccessfully(response.data));
        const { status, limit, offset } = store.getState().parking;
        dispatch(parkingGetList(offset, status, limit));
      })
      .catch(error => {
        let message = '';
        if (!error.response) {
          message = 'Network error!';
        } else {
          message = error.response.data.message;
        }
        dispatch(parkingChangeError(message));
      });
  };
};

export const statisticsGetingNum = bool => ({
  type: STATISTICS_FETCHING_NUM_USER_PARKING,
  payload: bool
});
export const statisticsGetNumError = message => ({
  type: STATISTICS_FETCH_NUM_USER_PARKING_ERROR,
  payload: message
});
export const statisticsGetNumSuccessfully = statistics => ({
  type: STATISTICS_FETCH_NUM_USER_PARKING_SUCCESS,
  payload: statistics
});
export const statisticsGetUserParkingNum = () => {
  return dispatch => {
    dispatch(statisticsGetingNum(true));
    getUserParkingNum()
      .then(response => {
        if (response.status !== 200) {
          dispatch(statisticsGetNumError(response.statusText));
        }
        return response;
      })
      .then(response => {
        dispatch(statisticsGetNumSuccessfully(response.data));
      })
      .catch(error => {
        let message = '';
        if (!error.response) {
          message = 'Network error!';
        } else {
          message = error.response.data.message;
        }
        dispatch(statisticsGetNumError(message));
      });
  };
};
