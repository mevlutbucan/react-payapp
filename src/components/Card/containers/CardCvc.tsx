import { FunctionComponent } from 'react';
import { useCvc } from 'contexts';

// TODO: #5 - CardCvc (Container)
const CardCvc: FunctionComponent = function () {
  const { cvc } = useCvc();

  return <p>{cvc}</p>;
};

export default CardCvc;
