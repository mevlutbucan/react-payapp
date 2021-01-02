import { FunctionComponent } from 'react';
import { useCvc } from 'contexts';
import { onCvcChange } from '../actions';
import { FormInput } from '../views';

interface IUpdateStatesArgs extends IUpdateStatesFunctionDefaultArgs {
  newCvc: string;
}

const FormCvc: FunctionComponent = function ({ ...otherProps }) {
  const { cvc, setCvc } = useCvc();

  const handleChange: IHandleChangeFunction = function (e) {
    const newCvc = onCvcChange(e);
    updateStates({ newCvc });
  };

  const handleFocus: IHandleFocusFunction = function (e) {
    // TODO: #2 - FormCvc > handleFocus
  };

  const updateStates: IUpdateStatesFunction<IUpdateStatesArgs> = function (args) {
    const { newCvc } = args;
    if (newCvc !== cvc) setCvc(newCvc);
  };

  return (
    <FormInput
      inputID="cvc"
      inputValue={cvc}
      labelText="CVC"
      maxLength={4}
      onInputChange={handleChange}
      onInputFocus={handleFocus}
      {...otherProps}
    />
  );
};

export default FormCvc;
