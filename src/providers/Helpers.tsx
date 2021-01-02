import { Context, ReactElement, ReactNode, useState } from 'react';

const DEFAULT_VALIDITY = true;

export function ValidityProvider(
  Context: Context<IValidityContextValue | DefaultContextType>,
  children: ReactNode
): ReactElement {
  const [isValid, setValidity] = useState(DEFAULT_VALIDITY);
  const validityContextValue = { isValid, setValidity };
  return <Context.Provider value={validityContextValue}>{children}</Context.Provider>;
}
