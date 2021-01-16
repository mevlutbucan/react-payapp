import { Context, ReactElement, ReactNode, useState } from 'react';

// const DEFAULT_VALIDITY = true;

// export function ValidityProvider<T>(
//   Context: Context<IValidityContextValue<T> | DefaultContextType>,
//   checkValidity: (args: T) => void,
//   children: ReactNode
// ): ReactElement {
//   const [isValid, setValidity] = useState(DEFAULT_VALIDITY);
//   const validityContextValue = { checkValidity, isValid, validityInfo };
//   return <Context.Provider value={validityContextValue}>{children}</Context.Provider>;
// }
