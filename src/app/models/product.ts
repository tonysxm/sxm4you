export interface Product {
  id?: number;
  name: string;
  price: number;
  discountedPrice?: number;
  description: string;
  categories: any[];
}
