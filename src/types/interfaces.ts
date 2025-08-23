import type { UUID, ApiListResponse } from './api';
import type { Product, CartState, OrderDraft } from './domain';
import type { CheckoutStep1Payload, CheckoutStep2Payload } from './events';

export interface IApiClient {
  getProducts(): Promise<ApiListResponse<Product>>;
  getProduct(id: UUID): Promise<Product>;
  createOrder(data: {
    items: UUID[];
    payment: NonNullable<OrderDraft['payment']>;
    address: NonNullable<OrderDraft['address']>;
    email: NonNullable<OrderDraft['email']>;
    phone: NonNullable<OrderDraft['phone']>;
    total: number;
  }): Promise<{ id: UUID; total: number }>;
}

export interface ICatalogModel {
  products: Product[];
  selectedId?: UUID;
  setProducts(items: Product[]): void;
  select(id: UUID): void;
  getSelected(): Product | undefined;
}

export interface ICartModel {
  state: CartState;
  add(id: UUID): void;
  remove(id: UUID): void;
  clear(): void;
  has(id: UUID): boolean;
}

export interface IOrderModel {
  draft: OrderDraft;
  setStep1(data: CheckoutStep1Payload): void;
  setStep2(data: CheckoutStep2Payload): void;
  toRequest(items: UUID[], total: number): Required<OrderDraft> & { items: UUID[]; total: number };
}

export interface ICatalogView {
  render(items: Product[]): void;
}

export interface IProductModalView {
  open(product: Product, inCart: boolean): void;
  close(): void;
}

export interface ICartView {
  open(state: CartState): void;
  close(): void;
}

export interface ICheckoutStep1View {
  fill(data?: Partial<OrderDraft>): void;
  setValid(valid: boolean): void;
}

export interface ICheckoutStep2View {
  fill(data?: Partial<OrderDraft>): void;
  setValid(valid: boolean): void;
}

export interface IModalView {
  open(): void;
  close(): void;
}
