import { useState } from 'react';
import { Context, ValidityContext } from 'contexts/ContextCvc';
import { ValidityProvider } from './Helpers';

const DEFAULT_CVC = '';

export const CvcProvider: IProviderComponent = function ({ children }) {
  const [cvc, setCvc] = useState(DEFAULT_CVC);
  const contextValue = { cvc, setCvc };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

// CURRENTLY NOT USED
export const CvcValidityProvider: IProviderComponent = ({ children }) =>
  ValidityProvider(ValidityContext, children);
