import { FunctionComponent, RefObject, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const DEFAULT_INPUT_CLASS = 'card-form__input';
const INVALID_INPUT_CLASS = 'invalid';

const FormInput: FunctionComponent<PropTypes> = function ({
  inputID,
  inputMode = 'numeric',
  inputPlaceholder,
  inputRef,
  inputType = 'text',
  inputValue,
  isValid = true,
  labelText,
  maxLength,
  onInputBlur,
  onInputChange,
  onInputFocus,
  sectionClass,
  validityInfo,
}) {
  if (labelText !== undefined && !inputID) {
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
      <div className="card-form__input--wrapper">
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
          ref={inputRef}
        />
        <FormInfo isValid={isValid} validityInfo={validityInfo} />
      </div>
    </section>
  );
};

function FormInfo({ isValid, validityInfo }: FormInfoPropTypes) {
  const [info, setInfo] = useState('');
  const nodeRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (validityInfo?.length !== 0) setInfo(validityInfo as string);
  }, [validityInfo]);
  return (
    <CSSTransition
      classNames="fade"
      in={!isValid}
      appear
      unmountOnExit
      nodeRef={nodeRef}
      addEndListener={done => nodeRef.current?.addEventListener('transitionend', done, false)}>
      <p className="card-form__info" ref={nodeRef}>
        {info}
      </p>
    </CSSTransition>
  );
}

type PropTypes = {
  inputID?: string;
  inputMode?: 'numeric' | 'text';
  inputPlaceholder?: string;
  inputRef?: RefObject<HTMLInputElement>;
  inputType?: 'tel' | 'text';
  inputValue: string;
  isValid?: boolean;
  labelText?: string;
  maxLength?: number;
  onInputBlur?: IHandleBlurFunction;
  onInputChange: IHandleChangeFunction;
  onInputFocus?: IHandleFocusFunction;
  sectionClass?: string;
  validityInfo?: string;
};

type FormInfoPropTypes = {
  isValid: boolean;
  validityInfo?: string;
};

export default FormInput;
