import type { UUID } from './api';
import type { Product, CartState, OrderDraft } from './domain';

export enum AppEvents {
  CatalogOpen = 'catalog:open',
  ProductOpen = 'product:open',
  CartOpen = 'cart:open',

  ProductAdd = 'product:add',
  ProductRemove = 'product:remove',

  CheckoutStep1Submit = 'checkout:step1:submit',
  CheckoutStep2Submit = 'checkout:step2:submit',

  OrderSuccess = 'order:success',

  ModalOpen = 'modal:open',
  ModalClose = 'modal:close',
  Error = 'error'
}

export type ProductOpenPayload = { id: UUID };
export type ProductTogglePayload = { id: UUID };

export type CartChangedPayload = CartState;

export type CheckoutStep1Payload = { payment: 'online' | 'card' | 'cash'; address: string };
export type CheckoutStep2Payload = { email: string; phone: string };

export type OrderSuccessPayload = { orderId: UUID; total: number };
export type ErrorPayload = { message: string };
