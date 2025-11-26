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

export interface BundleCreatedEvent {
  eventType: 'BundleCreated';
  timestamp: string;
  data: {
    bundleId: number;
    userId: number;
    name: string;
    recurrenceId: number;
  };
}

