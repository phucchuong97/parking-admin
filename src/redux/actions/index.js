import {
  AUTH,
  PARKING_LOADING,
  PARKING_FETCH_ERROR,
  PARKING_FETCH_SUCCESS
} from './type';
import { getList } from '../../api/parking';

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
