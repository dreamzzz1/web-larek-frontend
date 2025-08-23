export type UUID = string;

export type ApiListResponse<T> = {
  total: number;
  items: T[];
};

export interface ProductDTO {
  id: UUID;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number | null;
}

export interface OrderRequestDTO {
  items: UUID[];
  payment: PaymentMethod;
  address: string;
  email: string;
  phone: string;
  total: number;
}

export interface OrderResponseDTO {
  id: UUID;
  total: number;
  createdAt?: string;
}

export type PaymentMethod = 'online' | 'card' | 'cash';
