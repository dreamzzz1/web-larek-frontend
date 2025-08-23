import type { UUID, PaymentMethod } from './api';

export interface Product {
  id: UUID;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number | null;
}

export interface CartItem {
  product: Product;
  qty: number;          
  lineTotal: number;     
}

export interface CartState {
  items: CartItem[];
  total: number;
}

export interface OrderDraft {
  payment?: PaymentMethod;
  address?: string;
  email?: string;
  phone?: string;
}

export interface ProductViewModel {
  id: UUID;
  title: string;
  description: string;
  category: string;
  image: string;
  priceLabel: string; 
  inCart: boolean;
}
