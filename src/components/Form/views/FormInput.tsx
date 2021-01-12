import { FunctionComponent } from 'react';

const DEFAULT_INPUT_CLASS = 'card-form__input';
const INVALID_INPUT_CLASS = 'invalid';

type PropTypes = {
  inputID?: string;
  inputMode?: 'numeric' | 'text';
  inputPlaceholder?: string;
  inputType?: 'tel' | 'text';
  inputValue: string;
  isValid?: boolean;
  labelText?: string;
  maxLength?: number;
  onInputBlur?: IHandleBlurFunction;
  onInputChange: IHandleChangeFunction;
  onInputFocus?: IHandleFocusFunction;
  sectionClass?: string;
  validityText?: string; // Create a new view component "FormInputValidity"
};

// TODO: #3 - FormInput > Invalid Input Text
const FormInput: FunctionComponent<PropTypes> = function ({
  inputID,
  inputMode,
  inputPlaceholder,
  inputType,
  inputValue,
  isValid,
  labelText,
  maxLength,
  onInputBlur,
  onInputChange,
  onInputFocus,
  sectionClass,
  validityText, // Create a new view component "FormInputValidity"
}) {
  if (!!labelText && !inputID) {
    console.error('Label without input id!');
  }

  const inputClass = isValid
    ? DEFAULT_INPUT_CLASS
    : DEFAULT_INPUT_CLASS.concat(' ', INVALID_INPUT_CLASS);

  return (
    <section className={sectionClass}>
      {labelText
        ? (
            <label htmlFor={inputID} className="card-form__label">
              {labelText}
            </label>
          )
        : null}
      <input
        id={inputID}
        className={inputClass}
        type={inputType}
        inputMode={inputMode}
        maxLength={maxLength}
        placeholder={inputPlaceholder}
        required
        value={inputValue}
        onChange={onInputChange}
        onBlur={onInputBlur}
        onFocus={onInputFocus}
      />
    </section>
  );
};

FormInput.defaultProps = {
  // inputID: null,
  inputMode: 'numeric',
  inputType: 'text',
  isValid: true,
  // sectionClass: null,
};

export default FormInput;
