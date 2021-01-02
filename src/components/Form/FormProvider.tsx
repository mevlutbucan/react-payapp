import { FunctionComponent } from 'react';
import { NumberValidityProvider, ExpDateValidityProvider } from 'providers';
import { Form } from './containers';
import './Form.css';

// TODO: #1 - FormProvider > Props of Form Component
export const FormProvider: FunctionComponent = function ({ children, ...otherProps }) {
  return (
    <main id="card-form">
      <FormValidityProvider>
        <Form {...otherProps}>{children}</Form>
      </FormValidityProvider>
    </main>
  );
};

const FormValidityProvider: IProviderComponent = function ({ children }) {
  return (
    <NumberValidityProvider>
      <ExpDateValidityProvider>{children}</ExpDateValidityProvider>
    </NumberValidityProvider>
  );
};
