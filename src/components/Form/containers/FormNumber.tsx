import { FunctionComponent, useState } from 'react';
import { useNetwork, useNumber } from 'contexts';
import { onNumberChange } from '../actions';
import { FormInput } from '../views';

const DEFAULT_MAXLENGTH = 16;

interface IUpdateStatesArgs extends IUpdateStatesFunctionDefaultArgs {
  newNetwork: NetworkType;
  newNumber: string;
  newMaxLength?: number;
}

const FormNumber: FunctionComponent = function () {
  const { network, setNetwork } = useNetwork();
  const { number, setNumber } = useNumber();
  const [maxLength, setMaxLength] = useState(DEFAULT_MAXLENGTH);

  const handleChange: IHandleChangeFunction = function (e) {
    const [newNetwork, newNumber] = onNumberChange(e, number, network);
    const newMaxLength = !newNetwork
      ? DEFAULT_MAXLENGTH
      : newNetwork.length + newNetwork.pattern.length - 1;
    updateStates({ newNetwork, newNumber, newMaxLength });
  };

  const handleFocus: IHandleFocusFunction = function (e) {
    // TODO: #2 - FormNumber > handleFocus
  };

  const updateStates: IUpdateStatesFunction<IUpdateStatesArgs> = function (args) {
    const { newNetwork, newNumber, newMaxLength } = args;
    if (newNetwork?.name !== network?.name) setNetwork(newNetwork);
    if (newNumber !== number) setNumber(newNumber);
    if (!!newMaxLength && newMaxLength !== maxLength) setMaxLength(newMaxLength);
  };

  return (
    <FormInput
      inputID="card-number"
      inputValue={number}
      labelText="CARD NUMBER"
      maxLength={maxLength}
      onInputChange={handleChange}
      onInputFocus={handleFocus}
    />
  );
};

export default FormNumber;
