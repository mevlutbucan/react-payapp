/**
 * @returns `CardYear`
 */
export default function onYearBlur(event: BlurEventType, prevYear: string) {
  const inputValue = event.target.value;
  if (inputValue.length === 2) {
    return new Date().getFullYear().toString(10).slice(0, 2) + inputValue;
  }
  return prevYear;
}
