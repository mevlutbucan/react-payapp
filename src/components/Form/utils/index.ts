/**
 * @param cardNumber As a string without spaces.
 * @returns Validation result (true|false).
 */
export const checkCardNumber = (cardNetwork: NetworkType, cardNumber: string) => {
  if (!cardNetwork) return false;
  else {
    // if (cardNetwork.algorithm === 'Luhn')
    return checkLuhn(cardNumber);
  }
};

interface IAlgorithmicControlFunction {
  (cardNumber: string): boolean;
}

/**
 * The formula verifies a number against its included check digit, which is usually appended to a partial account number to generate the full account number. This number must pass the following test:
 *
 * 1. From the rightmost digit (excluding the check digit) and moving left, double the value of every second digit. The check digit is neither doubled nor included in this calculation; the first digit doubled is the digit located immediately left of the check digit. If the result of this doubling operation is greater than 9 (e.g., 8 × 2 = 16), then add the digits of the result (e.g., 16: 1 + 6 = 7, 18: 1 + 8 = 9) or, alternatively, the same final result can be found by subtracting 9 from that result (e.g., 16: 16 − 9 = 7, 18: 18 − 9 = 9).
 * 2. Take the sum of all the digits (including the check digit).
 * 3. If the total modulo 10 is equal to 0 (if the total ends in zero) then the number is valid according to the Luhn formula; otherwise it is not valid.
 */
const checkLuhn: IAlgorithmicControlFunction = function (cardNumber) {
  const sum = cardNumber
    .slice(0, cardNumber.length - 1)
    .split('')
    .reduceRight(
      // Callback function of reduce
      (acc, num, i) => {
        let value = parseInt(num, 10);
        if ((cardNumber.length - i) % 2 === 0) {
          value *= 2;
          if (value > 9) {
            value -= 9;
          }
        }
        return acc + value;
      },
      // Initial value of reduce (check digit)
      parseInt(cardNumber.slice(-1), 10)
    );
  return sum % 10 === 0;
};
