import { useHolder } from 'contexts';
import { useTransitionPlaceholder } from '../hooks';
import { CardHolderView } from '../views';

export default function CardHolder() {
  const { holder } = useHolder();

  const nameArr = holder.split(' ');
  const placeholderArr = useTransitionPlaceholder(holder).split(' ');

  return (
    <CardHolderView
      holderName={nameArr}
      isHolderEmpty={holder === ''}
      placeholder={placeholderArr}
    />
  );
}
