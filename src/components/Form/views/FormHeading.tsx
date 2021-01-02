import { FunctionComponent } from 'react';

type PropTypes = {
  text: string;
};

const FormHeading: FunctionComponent<PropTypes> = function ({ text }) {
  return <h1 className="card-form__heading">{text}</h1>;
};

export default FormHeading;
