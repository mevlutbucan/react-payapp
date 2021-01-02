import { FormProvider } from './FormProvider';
import { FormCvc, FormHolder, FormMonth, FormNumber, FormYear } from './containers';
import { FormPaymentAmount, FormFlexbox, FormHeading, FormInput, FormSubmitButton } from './views';

const Form = {
  Provider: FormProvider,
  Number: FormNumber,
  Holder: FormHolder,
  Month: FormMonth,
  Year: FormYear,
  Cvc: FormCvc,
  Input: FormInput,
  Flexbox: FormFlexbox,
  Heading: FormHeading,
  Amount: FormPaymentAmount,
  Submit: FormSubmitButton,
};

export default Form;
