const INTERNATIONAL_NUMBER = /^\d{8,15}$/;

export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const normalizedNumber = phoneNumber.replace(/\D/g, '');
  const normalizedMessage = message.trim();

  if (!INTERNATIONAL_NUMBER.test(normalizedNumber)) {
    throw new Error('El número de WhatsApp debe tener entre 8 y 15 dígitos.');
  }

  if (normalizedMessage.length === 0) {
    throw new Error('El mensaje de WhatsApp no puede estar vacío.');
  }

  const url = new URL(`https://wa.me/${normalizedNumber}`);
  url.searchParams.set('text', normalizedMessage);

  return url.toString();
}
