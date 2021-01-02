import { FunctionComponent } from 'react';
import { useExpDate, useExpDateValidity } from 'contexts';
import { onMonthBlur, onMonthChange } from '../actions';
import { FormInput } from '../views';

interface IUpdateStatesArgs extends IUpdateStatesFunctionDefaultArgs {
  newMonth: string;
}

const FormMonth: FunctionComponent = function ({ ...otherProps }) {
  const { month, setMonth } = useExpDate();

  const handleBlur: IHandleBlurFunction = function (e) {
    const newMonth = onMonthBlur(e, month);
    updateStates({ newMonth });
  };

  const handleChange: IHandleChangeFunction = function (e) {
    const newMonth = onMonthChange(e, month);
    updateStates({ newMonth });
  };

  const handleFocus: IHandleFocusFunction = function (e) {
    // TODO: #2 - FormMonth > handleFocus
  };

  const updateStates: IUpdateStatesFunction<IUpdateStatesArgs> = function (args) {
    const { newMonth } = args;
    if (newMonth !== month) setMonth(newMonth);
  };

  return (
    <FormInput
      inputID="card-month"
      inputPlaceholder="Month"
      inputValue={month}
      labelText="EXPIRATION DATE"
      maxLength={2}
      onInputBlur={handleBlur}
      onInputChange={handleChange}
      onInputFocus={handleFocus}
      {...otherProps}
    />
  );
};

export default FormMonth;
