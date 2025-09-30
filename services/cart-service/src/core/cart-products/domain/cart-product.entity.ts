export class CartProduct {
  constructor(
    public readonly id: number | null,
    public readonly cartId: number,
    public readonly productId: number,
    public amount: number,
  ) {}
}
