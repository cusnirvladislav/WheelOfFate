import {_getPreviousDate} from './helpers';

export const _shiftRulesPassed = (date, engineer, shifts) => {
  const previousDate = _getPreviousDate(date);

  const findEngineer = shifts
    ?.find(({date}) => date === previousDate)
    ?.engineers.find(({id}) => id === engineer.id);

  const countEngineers = shifts?.find(item => item.date === date)?.engineers
    .length;

  return (
    findEngineer === undefined &&
    (countEngineers < 2 || countEngineers === undefined)
  );
};
