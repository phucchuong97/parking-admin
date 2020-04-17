import {
  STATISTICS_FETCHING_NUM_USER_PARKING,
  STATISTICS_FETCH_NUM_USER_PARKING_ERROR,
  STATISTICS_FETCH_NUM_USER_PARKING_SUCCESS
} from '../actions/type';

const statisticsInitState = {
  loading: false,
  data: {},
  message: ''
};

export default function(state = statisticsInitState, action) {
  switch (action.type) {
    case STATISTICS_FETCHING_NUM_USER_PARKING:
      return {
        ...state,
        loading: action.payload
      };
    case STATISTICS_FETCH_NUM_USER_PARKING_ERROR:
      return {
        data: {},
        changing: false,
        loading: action.payload
      };
    case STATISTICS_FETCH_NUM_USER_PARKING_SUCCESS:
      return {
        data: action.payload,
        loading: false,
        message: ''
      };

    default:
      return state;
  }
}
