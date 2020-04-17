import {
  PARKING_LOADING,
  PARKING_FETCH_ERROR,
  PARKING_FETCH_SUCCESS
} from '../actions/type';

const parkingInitState = {
  loading: false,
  data: [],
  message: ''
};

export default function(state = parkingInitState, action) {
  switch (action.type) {
    case PARKING_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case PARKING_FETCH_ERROR:
      return {
        data: [],
        loading: false,
        message: action.payload
      };
    case PARKING_FETCH_SUCCESS:
      return {
        data: action.payload,
        loading: false,
        message: ''
      };

    default:
      return state;
  }
}
