import { memo, useRef } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

type PropTypes = {
  digit: string;
  width?: string;
};

const CardDigit = memo(function Digit({ digit, width }: PropTypes) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  const spanStyle = { width };

  return (
    <SwitchTransition>
      <CSSTransition
        classNames="rotateX"
        key={digit !== '#' ? '*' : '#'}
        nodeRef={nodeRef}
        addEndListener={done => nodeRef.current?.addEventListener('transitionend', done, false)}>
        <span className="card-digit" ref={nodeRef} style={spanStyle}>
          {digit}
        </span>
      </CSSTransition>
    </SwitchTransition>
  );
});

export default CardDigit;
