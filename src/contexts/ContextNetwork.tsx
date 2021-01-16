import { createSafeContext, useSafeContext } from './Helpers';

interface IContextValue {
  network: NetworkType;
  setNetwork: (network: NetworkType) => void;
}

export const Context = createSafeContext<IContextValue>();
// export const ValidityContext = createSafeContext<IValidityContextValue>();

export const useNetwork = () => useSafeContext(Context);
// export const useNetworkValidity = () => useSafeContext(ValidityContext);
