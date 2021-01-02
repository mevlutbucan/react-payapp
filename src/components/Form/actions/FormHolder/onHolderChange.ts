/**
 * @returns `CardHolder`
 */
export default function onHolderChange(event: ChangeEventType) {
  let inputValue = event.target.value
    .replace(/[^A-Za-z .ÇçĞğİıÖöŞşÜü]/g, '')
    .replace(/ {2,}/g, ' ')
    .replace(/\.{2,}/g, '.')
    .toLocaleLowerCase()
    .split(' ');
  inputValue.forEach((w, i) => {
    inputValue[i] = w.charAt(0).toLocaleUpperCase() + w.substring(1);
  });
  return inputValue.join(' ');
}
