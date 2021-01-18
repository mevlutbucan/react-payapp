import { useState } from 'react';
import { useNetwork, useNumber, useNumberValidity } from 'contexts';
import { onNumberChange } from '../actions';
import { FormInput } from '../views';

const DEFAULT_MAXLENGTH = 16;

const FormNumber = function () {
  const { network, setNetwork } = useNetwork();
  const { number, setNumber } = useNumber();
  const [maxLength, setMaxLength] = useState(DEFAULT_MAXLENGTH);
  const { checkValidity, isValid, validityInfo, numberInputRef } = useNumberValidity();

  const handleBlur: IHandleBlurFunction = function () {
    checkValidity({ checkType: 'ALL', network, number });
  };

  const handleChange: IHandleChangeFunction = function (e) {
    const [newNetwork, newNumber] = onNumberChange(e, number, network);
    const newMaxLength = !newNetwork
      ? DEFAULT_MAXLENGTH
      : newNetwork.length + newNetwork.pattern.length - 1;
    checkValidity({ checkType: 'CHANGE', network: newNetwork, number: newNumber });
    updateStates({ newNetwork, newNumber, newMaxLength });
  };

  const handleFocus: IHandleFocusFunction = function (e) {
    checkValidity({ checkType: 'RESET' });
  };

  interface IUpdateStatesArgs extends IUpdateStatesFunctionDefaultArgs {
    newNetwork: NetworkType;
    newNumber?: string;
    newMaxLength?: number;
  }
  const updateStates: IUpdateStatesFunction<IUpdateStatesArgs> = function (args) {
    const { newNetwork, newNumber = number, newMaxLength = maxLength } = args;
    if (newNetwork?.name !== network?.name) setNetwork(newNetwork);
    if (newNumber !== number) setNumber(newNumber);
    if (newMaxLength !== maxLength) setMaxLength(newMaxLength);
  };

  return (
    <FormInput
      inputID="card-number"
      inputRef={numberInputRef}
      inputValue={number}
      isValid={isValid}
      labelText="CARD NUMBER"
      maxLength={maxLength}
      onInputBlur={handleBlur}
      onInputChange={handleChange}
      onInputFocus={handleFocus}
      validityInfo={validityInfo}
    />
  );
};

export default FormNumber;
