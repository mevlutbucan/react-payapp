import { FunctionComponent } from 'react';
import { useNetwork } from 'contexts';
import { CardBrand, CardExpDate, CardHolder, CardNumber } from './containers';
import { Card, CardFlexbox } from './views';
import './Card.css';

/**
 * TODO: #4 - CardFocus Component
 * Additional Features: #1 - CardProvider > Props & Types
 */
const CardProvider: FunctionComponent = function ({ children, ...otherProps }) {
  const { network } = useNetwork();

  const pattern = network?.pattern;
  const symbol = network?.symbol;

  return (
    <Card>
      <CardBrand symbol={symbol} />
      <CardNumber pattern={pattern} />
      <CardFlexbox>
        <CardHolder />
        <CardExpDate />
      </CardFlexbox>
    </Card>
  );
};

export default CardProvider;
