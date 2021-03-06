/// <reference no-default-lib="true"/>

/// <reference lib="DOM" />

// *****DATA TYPES*****
interface INetwork {
  readonly name: string;
  readonly symbol: string;
  readonly IIN: RegExp;
  readonly length: number;
  readonly pattern: Array<number>;
}

type NetworkType = INetwork | undefined;

// *****CONTEXT TYPES*****
// interface IContextValue<T> {
//   [key: string]: T | ((value: T) => void);
// }
interface IValidityContextValue<T> {
  checkValidity: (args: T) => void;
  isValid: boolean;
  validityInfo: string;
}

type DefaultContextType = Symbol;

// *****HOOK TYPES*****

// *****EVENT TYPES*****
type BlurEventType = React.FocusEvent<HTMLInputElement>;
type ChangeEventType = React.ChangeEvent<HTMLInputElement>;
type FocusEventType = React.FocusEvent<HTMLInputElement>;
type SubmitEventType = React.FormEvent<HTMLFormElement>;

// *****FUNCTION TYPES*****
interface IUpdateStatesFunctionDefaultArgs {
  newFocus?: ComponentFocusType;
}

interface IHandleBlurFunction {
  (event: BlurEventType): void;
}
interface IHandleChangeFunction {
  (event: ChangeEventType): void;
}
interface IHandleFocusFunction {
  (event: FocusEventType): void;
}
interface IValidityCheckFunction<T> {
  (args: T): void;
}
interface IUpdateStatesFunction<T> {
  (args: T): void;
}

// *****COMPONENT TYPES*****
interface IProviderComponent {
  (props: { children: React.ReactNode }): React.ReactElement;
}

type BrandLogoComponentType = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

// *****MISCELLANEOUS TYPES*****
type ComponentFocusType = 'DEFAULT' | 'NUMBER' | 'HOLDER' | 'EXPDATE' | 'CVC';
