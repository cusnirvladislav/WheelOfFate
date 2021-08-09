import * as types from './constants';
import {_getEngineersAsync} from '../../../theme/localstorge';

export const _fetchEnginers = () => async (dispatch) => {
  try {
    dispatch(fetchEngineers.Pending(true));
    // console.log('_fetchEnginers1',engineers);
    const engineers = await _getEngineersAsync();
    console.log('_fetchEnginers1',engineers);
    engineers && dispatch(fetchEngineers.Success(engineers));
  } catch (e) {
    dispatch(fetchEngineers.Error(e));
  }
};

const fetchEngineers = {
  Success: data => ({
    type: types.FETCH_ENGINEERS_SUCCESS,
    engineers: data,
  }),
  Pending: isLoading => ({
    type: types.FETCH_ENGINEERS_PENDING,
    isLoading,
  }),
  Error: message => ({
    type: types.FETCH_ENGINEERS_ERROR,
    error: message,
  }),
};
