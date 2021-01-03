import { useRef } from 'react';
import { useHolder } from 'contexts';
import { CardHolderView } from '../views';

const DEFAULT_PLACEHOLDER = '';

export default function CardHolder() {
  const { holder } = useHolder();

  const nameArr = holder.split(' ');
  const placeholderArr = useTransitionPlaceholder(holder).split(' ');

  return (
    <CardHolderView
      holderName={nameArr}
      isHolderEmpty={holder === ''}
      placeholder={placeholderArr}
    />
  );
}

function useTransitionPlaceholder(value: string) {
  const placeholderRef = useRef<string>(DEFAULT_PLACEHOLDER);
  placeholderRef.current = value + placeholderRef.current.slice(value.length);
  return placeholderRef.current;
}
