import { createSafeContext, useSafeContext } from './Helpers';

interface IContextValue {
  number: string;
  setNumber: (number: string) => void;
}

export interface IValidityCheckFunctionArgs {
  checkType: 'ALL' | 'CHANGE' | 'RESET';
  network?: NetworkType;
  number?: string;
}
interface INumberValidityContextValue extends IValidityContextValue<IValidityCheckFunctionArgs> {
  numberInputRef: React.RefObject<HTMLInputElement>;
}

export const Context = createSafeContext<IContextValue>();
export const ValidityContext = createSafeContext<INumberValidityContextValue>();

export const useNumber = () => useSafeContext(Context);
export const useNumberValidity = () => useSafeContext(ValidityContext);
