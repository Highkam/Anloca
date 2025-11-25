export class Bundle {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly name: string,
    public readonly recurrenceId: number,
    public readonly createdAt: Date,
  ) {}
}
