import { useExpDate, useExpDateValidity } from 'contexts';
import { onYearBlur, onYearChange } from '../actions';
import { FormInput } from '../views';

const FormYear = function ({ ...styleProps }) {
  const { month, year, setYear } = useExpDate();
  const { checkValidity, isYearValid, yearInfo, yearInputRef } = useExpDateValidity();

  const handleBlur: IHandleBlurFunction = function (e) {
    const newYear = onYearBlur(e, year);
    checkValidity({ checkType: 'ALL', month, year: newYear });
    updateStates({ newYear });
  };

  const handleChange: IHandleChangeFunction = function (e) {
    const newYear = onYearChange(e);
    updateStates({ newYear });
  };

  const handleFocus: IHandleFocusFunction = function (e) {
    checkValidity({ checkType: 'RESET' });
  };

  interface IUpdateStatesArgs {
    newYear?: string;
  }
  const updateStates: IUpdateStatesFunction<IUpdateStatesArgs> = function (args) {
    const { newYear = year } = args;
    if (newYear !== year) setYear(newYear);
  };

  return (
    <FormInput
      inputID="card-year"
      inputPlaceholder="Year"
      inputRef={yearInputRef}
      inputValue={year}
      isValid={isYearValid}
      maxLength={4}
      onInputBlur={handleBlur}
      onInputChange={handleChange}
      onInputFocus={handleFocus}
      {...styleProps}
    />
  );
};

export default FormYear;
