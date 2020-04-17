import {
  PARKING_CHANGING,
  PARKING_CHANGE_ERROR,
  PARKING_CHANGE_SUCCESS
} from '../actions/type';

const parkingInitState = {
  changing: false,
  data: {},
  message: ''
};

export default function(state = parkingInitState, action) {
  switch (action.type) {
    case PARKING_CHANGING:
      return {
        ...state,
        changing: action.payload
      };
    case PARKING_CHANGE_ERROR:
      return {
        data: {},
        changing: false,
        message: action.payload
      };
    case PARKING_CHANGE_SUCCESS:
      return {
        data: action.payload,
        changing: false,
        message: ''
      };

    default:
      return state;
  }
}
