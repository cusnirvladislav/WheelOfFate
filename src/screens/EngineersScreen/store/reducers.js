import {
  FETCH_ENGINEERS_SUCCESS,
  FETCH_ENGINEERS_ERROR,
  FETCH_ENGINEERS_PENDING,
} from './constants';
import {initialState} from './initialState';

function engineersReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_ENGINEERS_SUCCESS:
      return {
        engineers: action.engineers,
        isLoading: false,
      };
    case FETCH_ENGINEERS_PENDING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case FETCH_ENGINEERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export default engineersReducers;
