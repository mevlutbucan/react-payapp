import { useState } from 'react';
import { useExpDate, useExpDateValidity } from 'contexts';
import { onYearBlur, onYearChange } from '../actions';
import { FormInput } from '../views';

const VALID = true;
const VALID_TEXT = '';
const INVALID = false;
const INVALIDLENGTH_TEXT = 'Please enter a 4-digit year!';
const INVALIDYEAR_TEXT = 'Please enter a valid year!';

const FormYear = function ({ ...styleProps }) {
  const { year, setYear } = useExpDate();
  const { isValid, setValidity } = useExpDateValidity();
  const [validityText, setValidityText] = useState(VALID_TEXT);

  interface IValidityCheckFunctionArgs {
    newYear: string;
  }
  const checkValidity: IValidityCheckFunction<IValidityCheckFunctionArgs> = function (args) {
    const { newYear } = args;
    function checkLength(): [boolean, string] | undefined {
      if (newYear.length < 4) return [INVALID, INVALIDLENGTH_TEXT];
    }
    function checkYear(): [boolean, string] | undefined {
      if (parseInt(newYear, 10) < new Date().getFullYear()) return [INVALID, INVALIDYEAR_TEXT];
    }
    function checkAll() {
      if (newYear.length !== 0) return checkLength() || checkYear();
    }
    return checkAll() || [VALID, VALID_TEXT];
  };

  const handleBlur: IHandleBlurFunction = function (e) {
    const newYear = onYearBlur(e, year);
    const [newValidity, newValidityText] = checkValidity({ newYear });
    updateStates({ newYear, newValidity, newValidityText });
  };

  const handleChange: IHandleChangeFunction = function (e) {
    const newYear = onYearChange(e);
    updateStates({ newYear });
  };

  const handleFocus: IHandleFocusFunction = function (e) {
    if (!isValid) updateStates({ newValidity: VALID });
  };

  interface IUpdateStatesArgs extends IUpdateStatesFunctionDefaultArgs {
    newYear?: string;
  }
  const updateStates: IUpdateStatesFunction<IUpdateStatesArgs> = function (args) {
    const { newYear = year, newValidity = isValid, newValidityText = validityText } = args;
    if (newYear !== year) setYear(newYear);
    if (newValidity !== isValid) setValidity(newValidity);
    if (newValidityText !== validityText) setValidityText(newValidityText);
  };

  return (
    <FormInput
      inputID="card-year"
      inputPlaceholder="Year"
      inputValue={year}
      isValid={isValid}
      maxLength={4}
      onInputBlur={handleBlur}
      onInputChange={handleChange}
      onInputFocus={handleFocus}
      validityText={validityText} // Create a new view component "FormInputValidity"
      {...styleProps}
    />
  );
};

export default FormYear;
