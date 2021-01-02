import { FunctionComponent } from 'react';
import { useNetwork } from 'contexts';
import { usePreviousPattern } from './hooks';
import { CardBrand, CardExpDate, CardHolder, CardNumber } from './containers';
import { Card, CardFlexbox } from './views';
import './Card.css';

/**
 * TODO: #4 - CardFocus Component
 * Additional Features: #1 - CardProvider > Props & Types
 */
const CardProvider: FunctionComponent = function ({ children, ...otherProps }) {
  const { network } = useNetwork();

  const symbol = network?.symbol;

  const newPattern = network?.pattern;
  const prevPattern = usePreviousPattern(newPattern);
  const pattern = newPattern?.toString() === prevPattern?.toString() ? prevPattern : newPattern;
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
