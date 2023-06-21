export interface Product {
  barcode: number;
  categories: string[];
  name: string;
  description: string;
  image: string;
  sustainabilityName: string;
  sustainabilityEcoWater: number;
  sustainabilityEcoLifetime: number;
  sustainabilityEco: number;
  sustainabilitySocial: number;
  favorite: boolean;
}
