import {IS_AUTH, IS_NOT_AUTH} from '../actions/type';

const initialState = false;

export default function (state = initialState, action) {
  switch (action.type) {
    case IS_AUTH:
      return true;

    case IS_NOT_AUTH:
      return false;

    default:
      return state;
  }
}