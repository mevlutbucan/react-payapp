import { createSafeContext, useSafeContext } from './Helpers';

interface IContextValue {
  cvc: string;
  setCvc: (cvc: string) => void;
}

export const Context = createSafeContext<IContextValue>();
// export const ValidityContext = createSafeContext<IValidityContextValue>();

export const useCvc = () => useSafeContext(Context);
// export const useCvcValidity = () => useSafeContext(ValidityContext);
