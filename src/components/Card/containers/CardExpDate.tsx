import { useExpDate } from 'contexts';
import { CardExpDateView } from '../views';

const DEFAULT_EXPMONTH = '##';
const DEFAULT_EXPYEAR = '##';

export default function CardExpDate() {
  const { month, year } = useExpDate();

  const expMonth = month.length === 2 ? month : DEFAULT_EXPMONTH;
  const expYear = year.length === 4 ? year.slice(-2) : DEFAULT_EXPYEAR;

  return <CardExpDateView month={expMonth} year={expYear} />;
}
