import { useRef, useState } from 'react';
import { Context, IValidityCheckFunctionArgs, ValidityContext } from 'contexts/ContextExpDate';

const DEFAULT_MONTH = '';
const DEFAULT_YEAR = '';
const DEFAULT_INFO = '';
const DEFAULT_VALIDITY = true;
const INVALIDMONTH_INFO = "Your card's expiration month is in the past!";
const INVALIDYEAR_INFO = "Your card's expiration year is in the past!";
const INVALIDYEARLENGTH_INFO = "Your card's expiration year is incomplete!";

export const ExpDateProvider: IProviderComponent = function ({ children }) {
  const [month, setMonth] = useState(DEFAULT_MONTH);
  const [year, setYear] = useState(DEFAULT_YEAR);
  const contextValue = { month, setMonth, year, setYear };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const ExpDateValidityProvider: IProviderComponent = ({ children }) => {
  const [isMonthValid, setMonthValidity] = useState(DEFAULT_VALIDITY);
  const [isYearValid, setYearValidity] = useState(DEFAULT_VALIDITY);
  const [monthInfo, setMonthInfo] = useState(DEFAULT_INFO);
  const [yearInfo, setYearInfo] = useState(DEFAULT_INFO);

  const monthInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);
  // const setMonthInputRef = (element: HTMLInputElement) => { monthInputRef = element };
  // const setYearInputRef = (element: HTMLInputElement) => { yearInputRef = element };

  function checkMonth(month: number, now: Date) {
    if (isNaN(month)) return;
    if (month < now.getMonth() + 1) return INVALIDMONTH_INFO;
  }
  function checkYear(year: number, now: Date) {
    if (isNaN(year)) return;
    if (year < 1000) return INVALIDYEARLENGTH_INFO;
    else if (year < now.getFullYear()) return INVALIDYEAR_INFO;
  }

  const checkValidity: IValidityCheckFunction<IValidityCheckFunctionArgs> = function (args) {
    const { checkType = "ALL", month, year } = args;
    if (checkType === "RESET_MONTH") return updateStates({ newMonthInfo: DEFAULT_INFO });
    if (checkType === "RESET")
      return updateStates({ newMonthInfo: DEFAULT_INFO, newYearInfo: DEFAULT_INFO });
    if (month === undefined || year === undefined) throw new Error('');
    const NOW = new Date();
    const MONTH = parseInt(month, 10);
    const YEAR = parseInt(year, 10);
    if (YEAR === NOW.getFullYear()) {
      const newMonthInfo = checkMonth(MONTH, NOW) || DEFAULT_INFO;
      return updateStates({ newMonthInfo });
    } else {
      const newYearInfo = checkYear(YEAR, NOW) || DEFAULT_INFO;
      return updateStates({ newYearInfo });
    }
  };

  interface IUpdateStatesArgs {
    newMonthInfo?: string;
    newYearInfo?: string;
  }
  var timeout: number;
  const updateStates: IUpdateStatesFunction<IUpdateStatesArgs> = function (args) {
    const { newMonthInfo = monthInfo, newYearInfo = yearInfo } = args;
    window.clearTimeout(timeout);
    if (newMonthInfo !== monthInfo)
      timeout = window.setTimeout(() => {
        setMonthValidity(newMonthInfo === DEFAULT_INFO);
        setMonthInfo(newMonthInfo);
      }, 10);
    if (newYearInfo !== yearInfo) {
      setYearValidity(newYearInfo === DEFAULT_INFO);
      setYearInfo(newYearInfo);
    }
  };

  const validityContextValue = {
    checkValidity,
    isMonthValid,
    isYearValid,
    monthInfo,
    yearInfo,
    monthInputRef,
    yearInputRef,
  };
  return <ValidityContext.Provider value={validityContextValue}>{children}</ValidityContext.Provider>;
};
