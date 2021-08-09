import * as types from './constants';
import {_getShiftsAsync, _saveShiftsAsync} from '../../../theme/localstorge';
import {_shiftRulesPassed} from '../../../theme/rules';

export const _fetchShifts = () => async dispatch => {
  try {
    dispatch(fetchShifts.Pending(true));
    const shifts = await _getShiftsAsync();
    shifts && dispatch(fetchShifts.Success(shifts));
  } catch (e) {
    dispatch(fetchShifts.Error(e));
  }
};

export const _saveShifts = (date, engineer) => async dispatch => {
  try {
    dispatch(fetchShifts.Pending(true));
    let shifts = await _getShiftsAsync();

    if (!shifts) {
      shifts = [];
    }

    const findIndexByDate =
      shifts && shifts.findIndex(item => item.date == date);

    if (_shiftRulesPassed(date, engineer, shifts)) {
      if (findIndexByDate >= 0) {
        const uniqueEngineer = shifts[findIndexByDate].engineers.find(
          item => item.id === engineer.id,
        );
        !uniqueEngineer && shifts[findIndexByDate].engineers.push(engineer);
      } else {
        shifts.push({
          date,
          engineers: [engineer],
        });
      }
    }

    if (shifts) {
      await _saveShiftsAsync(shifts);
      dispatch(fetchShifts.Success(shifts));
    }
  } catch (e) {
    dispatch(fetchShifts.Error(e));
  }
};

const fetchShifts = {
  Success: data => ({
    type: types.FETCH_SHIFTS_SUCCESS,
    shifts: data,
  }),
  Pending: isLoading => ({
    type: types.FETCH_SHIFTS_PENDING,
    isLoading,
  }),
  Error: message => ({
    type: types.FETCH_SHIFTS_ERROR,
    error: message,
  }),
};
