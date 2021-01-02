/**
 * @returns `CardYear`
 */
export default function onYearChange(event: ChangeEventType) {
  const inputValue = event.target.value.replace(/[^\d]/g, '');
  return inputValue;
}
