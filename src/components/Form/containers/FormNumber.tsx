import { useState } from 'react';
import { useNetwork, useNumber, useNumberValidity } from 'contexts';
import { onNumberChange } from '../actions';
import { checkCardNumber } from '../utils';
import { FormInput } from '../views';

const DEFAULT_MAXLENGTH = 16;
const NETWORKVALIDATION_MAXLENGTH = 6; // Max length of first digits that can be used for network detection of a card number.
const VALID = true;
const VALID_TEXT = '';
const INVALID = false;
const INVALIDLENGTH_TEXT = 'Your card number is incomplete!';
const INVALIDNETWORK_TEXT =
  'Please use one of the following card networks:\nAmerican Express, Discover, Maestro, MasterCard or Visa.';
const INVALIDNUMBER_TEXT = 'Please enter a valid card number!';

const FormNumber = function () {
  const { network, setNetwork } = useNetwork();
  const { number, setNumber } = useNumber();
  const [maxLength, setMaxLength] = useState(DEFAULT_MAXLENGTH);
  const { isValid, setValidity } = useNumberValidity();
  const [validityText, setValidityText] = useState(VALID_TEXT);

  type CheckType = 'BLUR' | 'CHANGE';
  interface IValidityCheckFunctionArgs {
    checkType: CheckType;
    newNetwork: NetworkType;
    newNumber?: string;
  }
  const checkValidity: IValidityCheckFunction<IValidityCheckFunctionArgs> = function (args) {
    const { checkType, newNetwork, newNumber = number } = args;
    function checkLength(): [boolean, string] | undefined {
      if (newNumber.length < maxLength)
        return [INVALID, INVALIDLENGTH_TEXT];
    }
    function checkNetwork(): [boolean, string] | undefined {
      if (!newNetwork && newNumber.length >= NETWORKVALIDATION_MAXLENGTH)
        return [INVALID, INVALIDNETWORK_TEXT];
    }
    function checkNumber(): [boolean, string] | undefined {
      if (newNumber.length === maxLength && !checkCardNumber(newNetwork, newNumber))
        return [INVALID, INVALIDNUMBER_TEXT];
    }
    function checkAll() {
      if (newNumber.length !== 0)
        if (checkType === 'CHANGE')
          if (newNumber.length === maxLength) return checkNetwork() || checkNumber();
          else return checkNetwork();
        else return checkNetwork() || checkLength() || checkNumber();
    }
    return checkAll() || [VALID, VALID_TEXT]
  };

  const handleBlur: IHandleBlurFunction = function () {
    const [newValidity, newValidityText] = checkValidity({ checkType: 'BLUR', newNetwork: network });
    updateStates({ newNetwork: network, newValidity, newValidityText });
  };

  const handleChange: IHandleChangeFunction = function (e) {
    const [newNetwork, newNumber] = onNumberChange(e, number, network);
    const newMaxLength = !newNetwork
      ? DEFAULT_MAXLENGTH
      : newNetwork.length + newNetwork.pattern.length - 1;
    const [newValidity, newValidityText] =
      checkValidity({ checkType: 'CHANGE', newNetwork, newNumber });
    updateStates({ newNetwork, newNumber, newMaxLength, newValidity, newValidityText });
  };

  const handleFocus: IHandleFocusFunction = function (e) {
    if (!isValid) updateStates({ newNetwork: network, newValidity: VALID });
  };

  interface IUpdateStatesArgs extends IUpdateStatesFunctionDefaultArgs {
    newNetwork: NetworkType;
    newNumber?: string;
    newMaxLength?: number;
  }
  const updateStates: IUpdateStatesFunction<IUpdateStatesArgs> = function (args) {
    const {
      newNetwork,
      newNumber = number,
      newMaxLength = maxLength,
      newValidity = isValid,
      newValidityText = validityText,
    } = args;
    if (newNetwork?.name !== network?.name) setNetwork(newNetwork);
    if (newNumber !== number) setNumber(newNumber);
    if (newMaxLength !== maxLength) setMaxLength(newMaxLength);
    if (newValidity !== isValid) setValidity(newValidity);
    if (newValidityText !== validityText) setValidityText(newValidityText);
  };

  return (
    <FormInput
      inputID="card-number"
      inputValue={number}
      isValid={isValid}
      labelText="CARD NUMBER"
      maxLength={maxLength}
      onInputBlur={handleBlur}
      onInputChange={handleChange}
      onInputFocus={handleFocus}
    />
  );
};

export default FormNumber;
