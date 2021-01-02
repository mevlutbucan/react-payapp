import { createSafeContext, useSafeContext } from './Helpers';

interface IContextValue {
  month: string;
  setMonth: (month: string) => void;
  year: string;
  setYear: (year: string) => void;
}

export const Context = createSafeContext<IContextValue>();
export const ValidityContext = createSafeContext<IValidityContextValue>();

export const useExpDate = () => useSafeContext(Context);
export const useExpDateValidity = () => useSafeContext(ValidityContext);
