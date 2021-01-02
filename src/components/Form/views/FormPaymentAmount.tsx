import { FunctionComponent } from 'react';

type PropTypes = {
  value: string;
};

const FormPaymentAmount: FunctionComponent<PropTypes> = function ({ value }) {
  return (
    <p className="card-form__text">
      Payment amount:<span className="card-form__text-span">{value}</span>
    </p>
  );
};

export default FormPaymentAmount;
