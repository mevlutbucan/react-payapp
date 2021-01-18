import { useRef, useState } from 'react';
import { Context, IValidityCheckFunctionArgs, ValidityContext } from 'contexts/ContextNumber';
import { checkCardNumber } from 'utils';

const DEFAULT_NUMBER = '';
const DEFAULT_INFO = '';
const DEFAULT_VALIDITY = true;
const INVALIDLENGTH_INFO = 'Your card number is incomplete!';
const INVALIDNETWORK_INFO =
  'Please use one of the following card networks:\n- American Express, Discover, Maestro, MasterCard or Visa.';
const INVALIDNUMBER_INFO = 'Your card number is invalid!';
const NETWORKVALIDATION_MAXLENGTH = 6; // Max length of first digits that can be used for network detection of a card number.

export const NumberProvider: IProviderComponent = function ({ children }) {
  const [number, setNumber] = useState(DEFAULT_NUMBER);
  const contextValue = { number, setNumber };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const NumberValidityProvider: IProviderComponent = ({ children }) => {
  const [isValid, setValidity] = useState(DEFAULT_VALIDITY);
  const [validityInfo, setValidityInfo] = useState(DEFAULT_INFO);

  const numberInputRef = useRef<HTMLInputElement>(null);

  function checkNumber(checkType: 'ALL' | 'CHANGE', network: NetworkType, number: string) {
    if (number.length >= NETWORKVALIDATION_MAXLENGTH) {
      if (!network) return INVALIDNETWORK_INFO;
      if (number.length < network.length) {
        if (checkType === 'ALL') return INVALIDLENGTH_INFO;
      } else if (!checkCardNumber(network, number)) return INVALIDNUMBER_INFO;
    } else if (number.length !== 0 && checkType === 'ALL') return INVALIDLENGTH_INFO;
  }

  const checkValidity: IValidityCheckFunction<IValidityCheckFunctionArgs> = function (args) {
    const { checkType = 'ALL', network, number } = args;
    if (checkType === 'RESET') return updateStates({ newValidityInfo: DEFAULT_INFO });
    if (number === undefined) throw new Error('');
    const pureNumber = number.replace(/[^\d]/g, '');
    const newValidityInfo = checkNumber(checkType, network, pureNumber) || DEFAULT_INFO;
    return updateStates({ newValidityInfo });
  };

  interface IUpdateStatesArgs {
    newValidityInfo: string;
  }
  const updateStates: IUpdateStatesFunction<IUpdateStatesArgs> = function (args) {
    const { newValidityInfo } = args;
    if (newValidityInfo !== validityInfo) {
      setValidity(newValidityInfo === DEFAULT_INFO);
      setValidityInfo(newValidityInfo);
    }
  };

  const validityContextValue = { checkValidity, isValid, validityInfo, numberInputRef };
  return <ValidityContext.Provider value={validityContextValue}>{children}</ValidityContext.Provider>;
};
