import { FunctionComponent } from 'react';

const FormPaymentAmount: FunctionComponent<PropTypes> = function ({ value }) {
  return (
    <p className="card-form__text">
      Payment amount:<span className="card-form__text-span">{value}</span>
    </p>
  );
};

type PropTypes = {
  value: string;
};

export default FormPaymentAmount;
