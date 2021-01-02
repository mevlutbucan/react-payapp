/**
 * @returns `CardMonth`
 */
export default function onMonthChange(event: ChangeEventType, prevMonth: string) {
  const inputValue = event.target.value.replace(/[^\d]/g, '');
  if (parseInt(inputValue, 10) > 12 || inputValue === '00') return prevMonth;
  return inputValue;
}
