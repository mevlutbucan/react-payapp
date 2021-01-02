import { useEffect, useRef } from 'react';

type PatternType = Array<number> | undefined;

export default function usePreviousPattern(pattern: PatternType) {
  const patternRef = useRef<PatternType>(undefined);

  function isEqual(value: PatternType) {
    const prevValue = patternRef.current;
    return value?.toString() === prevValue?.toString() ? [prevValue] : [value];
  }

  useEffect(() => {
    patternRef.current = pattern;
  }, isEqual(pattern)); // eslint-disable-line react-hooks/exhaustive-deps

  return patternRef.current;
}
