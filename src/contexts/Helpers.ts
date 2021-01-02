import { useContext, createContext, Context, ConsumerProps } from 'react';

const DEFAULT_VALUE = Symbol('Default Context Value');

export function createSafeContext<T>() {
  return createContext<T | DefaultContextType>(DEFAULT_VALUE);
}

export function useSafeContext<T>(Context: Context<T | DefaultContextType>) {
  const value = useContext(Context);
  if (value === DEFAULT_VALUE) throw new Error('No value provided for context!');
  return value as T;
}

// OPTIONAL
export function createSafeConsumer<T>(Context: Context<T | DefaultContextType>) {
  return function SafeConsumer({ children }: ConsumerProps<T>) {
    const value = useSafeContext(Context);
    return children(value);
  };
}
