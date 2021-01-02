import { useState } from 'react';
import { Context } from 'contexts/ContextNetwork';
// import { ValidityProvider } from './Helpers';

const DEFAULT_NETWORK = undefined;

export const NetworkProvider: IProviderComponent = function ({ children }) {
  const [network, setNetwork] = useState<NetworkType>(DEFAULT_NETWORK);
  const contextValue = { network, setNetwork };
  // const contextValue = useMemo(() => ({ network, setNetwork }), [network]);
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

// NOT REQUIRED
// export const NetworkValidityProvider: IProviderFunction = ({ children }) =>
//   ValidityProvider(ValidityContext, children);
