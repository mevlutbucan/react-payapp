import { createSafeContext, useSafeContext } from './Helpers';

interface IContextValue {
  holder: string;
  setHolder: (holder: string) => void;
}

export const Context = createSafeContext<IContextValue>();
// export const ValidityContext = createSafeContext<IValidityContextValue>();

export const useHolder = () => useSafeContext(Context);
// export const useHolderValidity = () => useSafeContext(ValidityContext);
