// Format a number as Persian Toman currency
// e.g. 185000 → "۱۸۵٬۰۰۰ تومان"
export function formatToman(amount) {
  if (amount == null) return '';
  return (
    amount.toLocaleString('fa-IR') + '\u00a0تومان'
  );
}

// Calculate discount percentage
export function discountPercent(original, current) {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}
