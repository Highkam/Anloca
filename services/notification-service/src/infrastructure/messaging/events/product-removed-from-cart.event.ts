export interface ProductRemovedFromCartEvent {
  eventType: 'ProductRemovedFromCart';
  timestamp: string;
  data: {
    cartId: number;
    productId: number;
    userId: number;
    removedAt: string;
  };
}
