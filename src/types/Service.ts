export interface Service {
  id: string;
  title: string;
  pricePrefix: 'Desde' | 'Revisión desde';
  startingPrice: number;
  shortDescription: string;
  longDescription: string;
  examples: readonly string[];
  whatsappMessage: string;
  featured?: boolean;
  diagnosticCredit?: boolean;
}
