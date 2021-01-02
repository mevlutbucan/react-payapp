import { useRef } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

type PropTypes = {
  BrandLogo: BrandLogoComponentType;
  symbol: string;
};

export default function CardBrandView({ BrandLogo, symbol }: PropTypes) {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="card-brand">
      <SwitchTransition>
        <CSSTransition
          classNames="fade"
          key={symbol}
          nodeRef={nodeRef}
          addEndListener={done => nodeRef.current?.addEventListener('transitionend', done, false)}>
          <div className="card-logo" ref={nodeRef}>
            <BrandLogo />
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
