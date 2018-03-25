export interface Product {
  id?: number;
  name: string;
  activePrice: number;
  discountedPrice?: number;
  description: string;
  categories: any[];
}
