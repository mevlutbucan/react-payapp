import { FunctionComponent } from 'react';

type PropTypes = {
  text?: string;
};

const FormSubmitButton: FunctionComponent<PropTypes> = function ({ text }) {
  return (
    <button className="card-form__button" type="submit">
      {text}
    </button>
  );
};

FormSubmitButton.defaultProps = {
  text: 'PAY',
};

export default FormSubmitButton;
