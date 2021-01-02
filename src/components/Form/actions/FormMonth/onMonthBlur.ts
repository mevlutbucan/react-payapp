/**
 * @returns `CardMonth`
 */
export default function onMonthBlur(event: BlurEventType, prevMonth: string) {
  const inputValue = parseInt(event.target.value, 10);
  if (isNaN(inputValue)) return prevMonth;
  else if (inputValue === 0) return '';
  else if (inputValue < 10) return '0' + inputValue;
  return inputValue.toString(10);
}
