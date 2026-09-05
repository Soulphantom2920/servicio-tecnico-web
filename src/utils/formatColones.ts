export function formatColones(amount: number): string {
  if (!Number.isSafeInteger(amount) || amount < 0) {
    throw new Error('El precio debe ser un entero no negativo.');
  }

  return `₡${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}
