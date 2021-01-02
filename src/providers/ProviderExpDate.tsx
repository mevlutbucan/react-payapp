import { useState } from 'react';
import { Context, ValidityContext } from 'contexts/ContextExpDate';
import { ValidityProvider } from './Helpers';

const DEFAULT_MONTH = '';
const DEFAULT_YEAR = '';

export const ExpDateProvider: IProviderComponent = function ({ children }) {
  const [month, setMonth] = useState(DEFAULT_MONTH);
  const [year, setYear] = useState(DEFAULT_YEAR);
  const contextValue = { month, setMonth, year, setYear };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const ExpDateValidityProvider: IProviderComponent = ({ children }) =>
  ValidityProvider(ValidityContext, children);
