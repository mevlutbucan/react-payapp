import { FunctionComponent } from 'react';

// TODO: #1 - Form > Props & Types
const Form: FunctionComponent = function ({ children, ...otherProps }) {
  function handleSubmit(e: SubmitEventType) {
    e.preventDefault();
    alert('SUBMITTED');
  }

  return (
    <form className="card-form" autoComplete="off" onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default Form;
