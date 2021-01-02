import { FunctionComponent, useState } from 'react';
import { useExpDate, useExpDateValidity } from 'contexts';
import { onYearBlur, onYearChange } from '../actions';
import { FormInput } from '../views';

const VALID = true;
const VALID_TEXT = '';
const INVALID = false;
const INVALIDLENGTH_TEXT = 'Please enter a 4-digit year!';
const INVALIDYEAR_TEXT = 'Please enter a valid year!';

interface IUpdateStatesArgs extends IUpdateStatesFunctionDefaultArgs {
  newYear?: string;
}

const FormYear: FunctionComponent = function ({ ...otherProps }) {
  const { year, setYear } = useExpDate();
  const { isValid, setValidity } = useExpDateValidity();
  const [validityText, setValidityText] = useState(VALID_TEXT);

  const checkValidity: IValidityCheckFunction = function (newYear) {
    if (newYear) {
      if (newYear.length < 4) return [INVALID, INVALIDLENGTH_TEXT];
      else if (parseInt(newYear, 10) < new Date().getFullYear())
        return [INVALID, INVALIDYEAR_TEXT];
    }
    return [VALID, VALID_TEXT];
  };

  const handleBlur: IHandleBlurFunction = function (e) {
    const newYear = onYearBlur(e, year);
    const [newValidity, newValidityText] = checkValidity(newYear);
    updateStates({ newYear, newValidity, newValidityText });
  };

  const handleChange: IHandleChangeFunction = function (e) {
    const newYear = onYearChange(e);
    updateStates({ newYear });
  };

  const handleFocus: IHandleFocusFunction = function (e) {
    if (!isValid) updateStates({ newValidity: true });
  };

  const updateStates: IUpdateStatesFunction<IUpdateStatesArgs> = function (args) {
    const { newYear, newValidity, newValidityText } = args;
    if (newYear !== undefined) if (newYear !== year) setYear(newYear);
    if (newValidity !== undefined) if (newValidity !== isValid) setValidity(newValidity);
    if (newValidityText !== undefined)
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
      validityText={validityText}
      {...otherProps}
    />
  );
};

export default FormYear;
