import {
  FETCH_SHIFTS_SUCCESS,
  FETCH_SHIFTS_ERROR,
  FETCH_SHIFTS_PENDING,
} from './constants';
import {initialState} from './initialState';

function shiftsReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_SHIFTS_SUCCESS:
      return {
        shifts: action.shifts,
        isLoading: false,
      };
    case FETCH_SHIFTS_PENDING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case FETCH_SHIFTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export default shiftsReducers;
