import { LogoAmEx, LogoDisc, LogoMC, LogoMaes, LogoVisa } from 'assets/logos';
import { CardBrandView } from '../views';

const DEFAULT_LOGO_COMPONENT = () => null;
const DEFAULT_SYMBOL = 'Default';

type PropTypes = {
  symbol?: string;
};

export default function CardBrand({ symbol }: PropTypes) {
  let logo: BrandLogoComponentType;

  switch (symbol) {
    case 'AmEx':
      logo = LogoAmEx;
      break;
    case 'Disc':
      logo = LogoDisc;
      break;
    case 'MC':
      logo = LogoMC;
      break;
    case 'Maes':
      logo = LogoMaes;
      break;
    case 'Visa':
      logo = LogoVisa;
      break;
    default:
      logo = DEFAULT_LOGO_COMPONENT;
      symbol = DEFAULT_SYMBOL;
      break;
  }

  return <CardBrandView BrandLogo={logo} symbol={symbol} />;
}
