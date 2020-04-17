import {
  AUTH,
  PARKING_LOADING,
  PARKING_FETCH_ERROR,
  PARKING_FETCH_SUCCESS,
  PARKING_CHANGING,
  PARKING_CHANGE_ERROR,
  PARKING_CHANGE_SUCCESS
} from './type';
import { getList, changeStatus } from '../../api/parking';

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
export const parkingGetList = () => {
  return dispatch => {
    dispatch(parkingIsLoading(true));
    getList()
      .then(response => {
        dispatch(parkingIsLoading(false));
        if (response.status !== 200) {
          return dispatch(parkingHasLoadingError(response.statusText));
        }
        return response;
      })
      .then(response => {
        dispatch(parkingGetListSuccessfully(response.data.parking));
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

export const parkingChanging = bool => ({
  type: PARKING_CHANGING,
  payload: bool
});
export const parkingChangeError = message => ({
  type: PARKING_CHANGE_ERROR,
  payload: message
});
export const parkingChangeStatusSucessfully = parking => ({
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
        dispatch(parkingChangeStatusSucessfully(response.data));
        dispatch(parkingGetList())
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
