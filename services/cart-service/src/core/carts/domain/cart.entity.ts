export class Cart {
  constructor(
    public readonly id: number | null,
    public readonly userId: number,
    public readonly createdAt: Date,
    public state: string,
  ) {}
}