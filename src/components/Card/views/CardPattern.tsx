import { memo } from 'react';
import Digit from './CardDigit';

type PropTypes = {
  digits: string;
  digitProps?: {
    width: string;
  };
};

const CardPattern = memo(function Pattern({ digits, digitProps }: PropTypes) {
  if (!digits) return null;

  return (
    <div className="card-pattern">
      {[].map.call(digits, (v, i) => {
        return <Digit key={i} digit={v} {...digitProps} />;
      })}
    </div>
  );
});

export default CardPattern;
