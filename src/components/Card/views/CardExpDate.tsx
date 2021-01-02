import CardPattern from './CardPattern';

type PropTypes = {
  month: string;
  year: string;
};

export default function CardExpDateView({ month, year }: PropTypes) {
  const digitProps = {
    width: '12px',
  };

  return (
    <div className="card-expdate">
      <div className="card-label">EXPIRY DATE</div>
      <div className="card-input">
        <label htmlFor="card-month">
          <CardPattern digits={month} digitProps={digitProps} />
        </label>
        <span style={{ width: '15px', textAlign: 'center' }}>/</span>
        <label htmlFor="card-year">
          <CardPattern digits={year} digitProps={digitProps} />
        </label>
      </div>
    </div>
  );
}
