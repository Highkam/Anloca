export class Product {
  constructor(
    public readonly id_product: number,
    public name: string,
    public description: string | null,
    public price: number,
    public stock: number,
    public category: string,
    public is_active: boolean,
    public created_at: Date
  ) {}

  updateStock(newStock: number): void {
    if (newStock < 0) {
      throw new Error('Stock cannot be negative');
    }
    this.stock = newStock;
  }

  updatePrice(newPrice: number): void {
    if (newPrice <= 0) {
      throw new Error('Price must be positive');
    }
    this.price = newPrice;
  }

  isAvailable(): boolean {
    return this.is_active && this.stock > 0;
  }

  decreaseStock(quantity: number): void {
    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }
    if (this.stock < quantity) {
      throw new Error('Insufficient stock');
    }
    this.stock -= quantity;
  }
}