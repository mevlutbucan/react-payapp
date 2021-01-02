import { Children, cloneElement, FunctionComponent, isValidElement } from 'react';

type PropTypes = {
  numberOfColumns?: '2' | '3';
};

const FormFlexbox: FunctionComponent<PropTypes> = function ({ children, numberOfColumns }) {
  const sectionClass = `card-form__column-${numberOfColumns}`;

  const flexboxChildren = Children.map(children, child => {
    if (isValidElement(child)) {
      return cloneElement(child, { sectionClass });
    } else return child;
  });

  return <div className="card-form__flexbox">{flexboxChildren}</div>;
};

FormFlexbox.defaultProps = {
  numberOfColumns: '2',
};

export default FormFlexbox;
