import { memo, useLayoutEffect, useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const DEFAULT_HOLDERNAME = 'Full Name';
const DEFAULT_HOLDERVIEW = <div>{DEFAULT_HOLDERNAME}</div>;

type PropTypes = {
  holderName: Array<string>;
  isHolderEmpty: boolean;
  placeholder: Array<string>;
};

export default function CardHolderView({ holderName, isHolderEmpty, placeholder }: PropTypes) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'DEFAULT' | 'HOLDER'>('DEFAULT');

  if (!isHolderEmpty && status === 'DEFAULT') setStatus('HOLDER');

  const handleOnExited = () => {
    setStatus('DEFAULT');
  };

  return (
    <div className="card-holder">
      <div className="card-label">CARD HOLDER</div>
      <label htmlFor="card-holder" className="card-input">
        <SwitchTransition>
          <CSSTransition
            classNames="fade"
            key={status}
            nodeRef={nodeRef}
            addEndListener={done =>
              nodeRef.current?.addEventListener('transitionend', done, false)
            }>
            <div className="holder-name" ref={nodeRef}>
              {status === 'DEFAULT'
                ? DEFAULT_HOLDERVIEW
                : placeholder.map((value, index) => (
                    <NamePart
                      key={index}
                      placeholder={value}
                      realPart={holderName[index]}
                      onExited={index === 0 ? handleOnExited : undefined}
                    />
                  ))}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </label>
    </div>
  );
}

/**
 * *****NAMEPART COMPONENT*****
 */
type NamePartPropTypes = {
  placeholder: string;
  realPart?: string;
  onExited?: () => void;
};

const NamePart = memo(function NamePart({ placeholder, realPart, onExited }: NamePartPropTypes) {
  const [status, setStatus] = useState<'MOUNTED' | 'UNMOUNTED'>('UNMOUNTED');

  if (!!realPart && status === 'UNMOUNTED') setStatus('MOUNTED');

  const handleFirstLetterOnExited = () => {
    setStatus('UNMOUNTED');
    if (!!onExited) onExited();
  };

  return status === 'UNMOUNTED'
    ? null
    : (
        <div className="holder-name__part">
          {[].map.call(placeholder, (letter, index) => {
            const inProp = !realPart ? false : index < realPart.length;
            return (
              <Letter
                key={index}
                in={inProp}
                letter={letter}
                onExited={index === 0 ? handleFirstLetterOnExited : undefined}
              />
            );
          })}
        </div>
      );
});

/**
 * *****LETTER COMPONENT*****
 */
type LetterPropTypes = {
  in: boolean;
  letter: string;
  onExited?: () => void;
};

const Letter = memo(function Letter(props: LetterPropTypes) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [inProp, setInProp] = useState(false);

  useLayoutEffect(() => {
    if (props.in !== inProp) setInProp(props.in);
  }, [props.in]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CSSTransition
      classNames="slide"
      in={inProp}
      appear
      unmountOnExit
      onExited={props.onExited}
      nodeRef={nodeRef}
      addEndListener={done => nodeRef.current?.addEventListener('transitionend', done, false)}>
      <span className="holder-name__letter" ref={nodeRef}>
        {props.letter}
      </span>
    </CSSTransition>
  );
});
