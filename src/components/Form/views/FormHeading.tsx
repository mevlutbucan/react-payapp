import { FunctionComponent } from 'react';

const FormHeading: FunctionComponent<PropTypes> = function ({ text }) {
  return <h1 className="card-form__heading">{text}</h1>;
};

type PropTypes = {
  text: string;
};

export default FormHeading;
