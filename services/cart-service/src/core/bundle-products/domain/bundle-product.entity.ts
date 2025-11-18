export class BundleProduct {
  constructor(
    public readonly id: number,
    public readonly bundleId: number,
    public readonly productId: number,
    public readonly amount: number,
  ) {}
}