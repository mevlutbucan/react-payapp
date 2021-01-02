import { getCardNetwork } from 'data/networks';

/**
 * @returns `[CardNetwork, CardNumber]`
 */
export default function onNumberChange(
  event: ChangeEventType,
  number: string,
  network: NetworkType
): [NetworkType, string] {
  const inputValue = event.target.value
    .replace(/[^ \d]/g, '')
    .replace(/ {3,}/g, ' ')
    .split(' ');
  const prevNumber = number.split(' ');
  const currNetwork = searchForNewNetwork(inputValue, prevNumber, network);
  const currNumber = !currNetwork
    ? inputValue.join('')
    : getCardNumberByPattern(inputValue, prevNumber, currNetwork.pattern);
  return [currNetwork, currNumber];
}

/**
 * @returns `CardNetwork`
 */
function searchForNewNetwork(
  currNumber: Array<string>,
  prevNumber: Array<string>,
  prevNetwork: NetworkType
) {
  const searchCondition: boolean =
    currNumber.length === 1 ||
    (currNumber[0].length === prevNetwork?.pattern[0] &&
      (currNumber[0] !== prevNumber[0] || currNumber[1] !== prevNumber[1]));
  return searchCondition ? getCardNetwork(currNumber.join('')) : prevNetwork;
}

/**
 * @returns `CardNumber`
 */
function getCardNumberByPattern(
  inputValue: Array<string>,
  prevNumber: Array<string>,
  pattern: Array<number>
) {
  inputValue = inputValue.join(' ').split(' ', pattern.length);
  for (let i = 0; i < pattern.length; i++) {
    if (inputValue[i] === undefined) break;
    else if (inputValue[i].length > pattern[i]) {
      if (prevNumber[i + 1] !== undefined || i === pattern.length - 1)
        inputValue[i] = !!prevNumber[i]
          ? prevNumber[i].slice(0, pattern[i])
          : inputValue[i].slice(0, pattern[i]);
      else {
        inputValue[i + 1] = inputValue[i].substring(pattern[i]);
        inputValue[i] = inputValue[i].slice(0, pattern[i]);
      }
    }
  }
  const currNumber = inputValue.join(' ');
  if (currNumber.length < prevNumber.join(' ').length) return currNumber.trimEnd();
  else return currNumber;
}
