import { createSafeContext, useSafeContext } from './Helpers';

interface IContextValue {
  number: string;
  setNumber: (number: string) => void;
}

export const Context = createSafeContext<IContextValue>();
export const ValidityContext = createSafeContext<IValidityContextValue>();

export const useNumber = () => useSafeContext(Context);
export const useNumberValidity = () => useSafeContext(ValidityContext);
