import { useRef } from 'react';

export default function useTransitionPlaceholder(value: string) {
  const placeholderRef = useRef('');
  placeholderRef.current = value + placeholderRef.current.slice(value.length);
  return placeholderRef.current;
}
