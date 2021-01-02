import { useState } from 'react';
import { Context, ValidityContext } from 'contexts/ContextNumber';
import { ValidityProvider } from './Helpers';

const DEFAULT_NUMBER = '';

export const NumberProvider: IProviderComponent = function ({ children }) {
  const [number, setNumber] = useState(DEFAULT_NUMBER);
  const contextValue = { number, setNumber };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const NumberValidityProvider: IProviderComponent = ({ children }) =>
  ValidityProvider(ValidityContext, children);
