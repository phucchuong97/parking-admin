import {
  PARKING_LOADING,
  PARKING_FETCH_ERROR,
  PARKING_FETCH_SUCCESS,
  PARKING_CHANGE_STATUS,
  PARKING_CHANGE_OFFSET,
  PARKING_CHANGE_LIMIT,
  PARKING_CHANGE_TOTAL
} from '../actions/type';
import { STATUS } from '../../common/constant';

const parkingInitState = {
  loading: false,
  data: [],
  message: '',
  offset: 0,
  total: 0,
  limit: 6,
  status: STATUS.ALL
};

export default function(state = parkingInitState, action) {
  switch (action.type) {
    case PARKING_LOADING:
      return {
        ...state,
        message: '',
        loading: action.payload
      };
    case PARKING_FETCH_ERROR:
      return {
        ...state,
        data: [],
        loading: false,
        message: action.payload
      };
    case PARKING_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        message: ''
      };
    case PARKING_CHANGE_STATUS:
      return {
        ...state,
        status: action.payload,
        message: ''
      };
    case PARKING_CHANGE_OFFSET:
      return {
        ...state,
        offset: action.payload,
        message: ''
      };
    case PARKING_CHANGE_LIMIT:
      return {
        ...state,
        limit: action.payload,
        message: ''
      };
    case PARKING_CHANGE_TOTAL:
      return {
        ...state,
        total: action.payload,
        message: ''
      };
    default:
      return state;
  }
}
