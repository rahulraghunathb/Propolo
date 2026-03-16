export function getCurrentPaymentMonth(date = new Date()) {
  return date.toISOString().slice(0, 7);
}
