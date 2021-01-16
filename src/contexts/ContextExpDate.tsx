import { createSafeContext, useSafeContext } from './Helpers';

interface IContextValue {
  month: string;
  setMonth: (month: string) => void;
  year: string;
  setYear: (year: string) => void;
}

export interface IValidityCheckFunctionArgs {
  checkType: 'ALL' | 'RESET' | 'RESET_MONTH';
  month?: string;
  year?: string;
}
interface IExpDateValidityContextValue {
  checkValidity: (args: IValidityCheckFunctionArgs) => void;
  isMonthValid: boolean;
  isYearValid: boolean;
  monthInfo: string;
  yearInfo: string;
  monthInputRef: React.RefObject<HTMLInputElement>;
  yearInputRef: React.RefObject<HTMLInputElement>;
}

export const Context = createSafeContext<IContextValue>();
export const ValidityContext = createSafeContext<IExpDateValidityContextValue>();

export const useExpDate = () => useSafeContext(Context);
export const useExpDateValidity = () => useSafeContext(ValidityContext);
