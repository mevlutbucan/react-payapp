const CARD_NETWORKS: Array<INetwork> = [
  {
    name: 'American Express',
    symbol: 'AmEx',
    IIN: /^3[47]/,
    length: 15,
    pattern: [4, 6, 5],
  },
  {
    name: 'Discover Card',
    symbol: 'Disc',
    IIN: /^6011|^(62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])|^(64[4-9])|^65/,
    length: 16,
    pattern: [4, 4, 4, 4],
  },
  {
    name: 'Maestro',
    symbol: 'Maes',
    IIN: /^50|^(5[6-8])|^6/,
    length: 16,
    pattern: [4, 4, 4, 4],
  },
  {
    name: 'MasterCard',
    symbol: 'MC',
    IIN: /^(222[1-9]|22[3-9]|2[3-6]|27[01]|2720)|^(5[1-5])/,
    length: 16,
    pattern: [4, 4, 4, 4],
  },
  {
    name: 'Visa',
    symbol: 'Visa',
    IIN: /^4/,
    length: 16,
    pattern: [4, 4, 4, 4],
  },
];

/**
 * Returns the card network by comparing card number with the IIN ranges.
 *
 * @param cardNumber As a string without spaces.
 * @returns Card Network
 */
export const getCardNetwork = (cardNumber: string) => {
  return CARD_NETWORKS.find(network => cardNumber.match(network.IIN));
};
