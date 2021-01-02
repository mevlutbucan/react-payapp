import { FunctionComponent } from 'react';
import { useHolder } from 'contexts';
import { onHolderChange } from '../actions';
import { FormInput } from '../views';

interface IUpdateStatesArgs extends IUpdateStatesFunctionDefaultArgs {
  newHolder: string;
}

const FormHolder: FunctionComponent = function () {
  const { holder, setHolder } = useHolder();

  const handleChange: IHandleChangeFunction = function (e) {
    const newHolder = onHolderChange(e);
    updateStates({ newHolder });
  };

  const handleFocus: IHandleFocusFunction = function (e) {
    // TODO: #2 - FormHolder > handleFocus
  };

  const updateStates: IUpdateStatesFunction<IUpdateStatesArgs> = function (args) {
    const { newHolder } = args;
    if (newHolder !== holder) setHolder(newHolder);
  };

  return (
    <FormInput
      inputID="card-holder"
      inputMode="text"
      inputValue={holder}
      labelText="CARDHOLDER NAME"
      onInputChange={handleChange}
      onInputFocus={handleFocus}
    />
  );
};

export default FormHolder;
