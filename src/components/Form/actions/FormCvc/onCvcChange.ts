/**
 * @returns `CVC`
 */
export default function onCvcChange(event: ChangeEventType) {
  return event.target.value.replace(/[^\d]/g, '');
}
