import PayApp from 'components';
import './App.css';

const { Card, Form } = PayApp;

export default function App() {
  return (
    <div className="App">
      {/* OPTIONAL: HEADER */}
      <PayApp.Provider>
        <Card.Provider />
        <Form.Provider>
          <Form.Heading text="Payment Details" />
          <Form.Number />
          <Form.Holder />
          <Form.Flexbox numberOfColumns="3">
            <Form.Month />
            <Form.Year />
            <Form.Cvc />
          </Form.Flexbox>
          <Form.Amount value="12 300 $" />
          <Form.Submit />
        </Form.Provider>
      </PayApp.Provider>
      {/* OPTIONAL: FOOTER */}
    </div>
  );
}
