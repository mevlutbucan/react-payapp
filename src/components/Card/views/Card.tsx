import { FunctionComponent } from 'react';

const Card: FunctionComponent = function ({ children }) {
  return <section className="card">{children}</section>;
};

export default Card;
