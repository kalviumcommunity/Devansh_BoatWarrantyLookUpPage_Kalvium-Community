export function validateSerialNumber(serialNumber) {
  return /^[A-Z0-9-]{6,30}$/.test(serialNumber?.trim().toUpperCase() || "");
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim() || "");
}
