// Guards against floating-point noise (e.g. 198.00000000000003) pushing
// Math.ceil up to the next whole unit on what should be an exact result.
export function ceilSafe(value: number, epsilon = 1e-9) {
  return Math.ceil(value - epsilon);
}

export function formatNumber(value: number, digits = 0) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}
