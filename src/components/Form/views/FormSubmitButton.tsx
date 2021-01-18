import { FunctionComponent } from 'react';

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

type PropTypes = {
  text?: string;
};

export default FormSubmitButton;
