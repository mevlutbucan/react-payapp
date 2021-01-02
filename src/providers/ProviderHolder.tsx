import { useState } from 'react';
import { Context, ValidityContext } from 'contexts/ContextHolder';
import { ValidityProvider } from './Helpers';

const DEFAULT_HOLDER = '';

export const HolderProvider: IProviderComponent = function ({ children }) {
  const [holder, setHolder] = useState(DEFAULT_HOLDER);
  const contextValue = { holder, setHolder };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

// CURRENTLY NOT USED
export const HolderValidityProvider: IProviderComponent = ({ children }) =>
  ValidityProvider(ValidityContext, children);
