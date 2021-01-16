import { useExpDate, useExpDateValidity } from 'contexts';
import { onMonthBlur, onMonthChange } from '../actions';
import { FormInput } from '../views';

const FormMonth = function ({ ...styleProps }) {
  const { month, year, setMonth } = useExpDate();
  const { checkValidity, isMonthValid, monthInfo, monthInputRef } = useExpDateValidity();

  const handleBlur: IHandleBlurFunction = function (e) {
    const newMonth = onMonthBlur(e, month);
    checkValidity({ checkType: 'ALL', month: newMonth, year });
    updateStates({ newMonth });
  };

  const handleChange: IHandleChangeFunction = function (e) {
    const newMonth = onMonthChange(e, month);
    updateStates({ newMonth });
  };

  const handleFocus: IHandleFocusFunction = function (e) {
    checkValidity({ checkType: 'RESET_MONTH' });
  };

  interface IUpdateStatesArgs {
    newMonth?: string;
  }
  const updateStates: IUpdateStatesFunction<IUpdateStatesArgs> = function (args) {
    const { newMonth = month } = args;
    if (newMonth !== month) setMonth(newMonth);
  };

  return (
    <FormInput
      inputID="card-month"
      inputPlaceholder="Month"
      inputRef={monthInputRef}
      inputValue={month}
      isValid={isMonthValid}
      labelText="EXPIRATION DATE"
      maxLength={2}
      onInputBlur={handleBlur}
      onInputChange={handleChange}
      onInputFocus={handleFocus}
      {...styleProps}
    />
  );
};

export default FormMonth;
