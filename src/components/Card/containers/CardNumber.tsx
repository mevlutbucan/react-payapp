import { Component } from 'react';
import { useNumber } from 'contexts';
import { CardNumberView } from '../views';

const DEFAULT_PLACEHOLDER = '#### #### #### ####';

type WrapperPropTypes = {
  pattern?: Array<number>;
};
interface PropTypes extends WrapperPropTypes {
  number: string;
}

export default function CardNumberWrapper({ pattern }: WrapperPropTypes) {
  const { number } = useNumber();
  return <CardNumber number={number} pattern={pattern} />;
}

class CardNumber extends Component<PropTypes> {
  placeholder: Array<string> = DEFAULT_PLACEHOLDER.split(' ');
  maskedNumber: Array<string> = this.placeholder;
  prevMaskedNumber: Array<string> = this.maskedNumber;
  prevNumber: string;
  prevPattern?: Array<number>;

  constructor(props: PropTypes) {
    super(props);
    this.prevNumber = props.number;
    this.prevPattern = props.pattern;
  }

  setEverythingForRender() {
    const isSamePattern = this.props.pattern?.toString() === this.prevPattern?.toString();
    if (!isSamePattern) {
      this.prevPattern = this.props.pattern;
      this.placeholder = getPlaceholder(this.props.pattern);
    }
    this.maskedNumber = getMaskedNumber(
      this.props.number,
      this.placeholder,
      this.prevNumber,
      this.prevMaskedNumber,
      this.props.pattern,
      isSamePattern
    );
    this.prevNumber = this.props.pattern ? this.props.number : '';
    this.prevMaskedNumber = this.maskedNumber;
  }

  render() {
    this.setEverythingForRender();
    return <CardNumberView maskedNumber={this.maskedNumber} />;
  }
}

function getMaskedNumber(
  number: string,
  placeholder: Array<string>,
  prevNumber: string,
  prevMaskedNumber: Array<string>,
  pattern: Array<number> | undefined,
  isSamePattern: boolean
) {
  if (!number || !pattern) return placeholder;
  if (number === prevNumber) return prevMaskedNumber;
  const numberArr = number.split(' ');
  const prevNumberArr = prevNumber.split(' ');
  return placeholder.reduce(
    (maskedNumber, value, i) => {
      if (!numberArr[i]) maskedNumber[i] = value;
      else if (isSamePattern && numberArr[i] === prevNumberArr[i])
        maskedNumber[i] = prevMaskedNumber[i];
      else {
        const defaultPart = value.slice(numberArr[i].length);
        if (i > 0 && i < pattern.length - 1)
          maskedNumber[i] = '*'.repeat(numberArr[i].length) + defaultPart;
        else maskedNumber[i] = numberArr[i] + defaultPart;
      }
      return maskedNumber;
    },
    ['']
  );
}

function getPlaceholder(pattern?: Array<number>) {
  if (!pattern) return DEFAULT_PLACEHOLDER.split(' ');
  else
    return pattern.reduce(
      (placeholder, value, i) => {
        placeholder[i] = '#'.repeat(value);
        return placeholder;
      },
      ['']
    );
}
