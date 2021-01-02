import CardPattern from './CardPattern';

type PropTypes = {
  maskedNumber: Array<string>;
};

export default function CardNumberView({ maskedNumber }: PropTypes) {
  return (
    <label htmlFor="card-number" className="card-number">
      {maskedNumber.map((digits, i) => {
        return <CardPattern key={i} digits={digits} />;
      })}
    </label>
  );
}
