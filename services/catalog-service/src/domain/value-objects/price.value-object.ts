export class Price {
  constructor(private readonly value: number) {
    if (value < 0) {
      throw new Error('Price cannot be negative');
    }
  }

  getValue(): number {
    return this.value;
  }

  format(): string {
    return `$${this.value.toFixed(2)}`;
  }

  add(price: Price): Price {
    return new Price(this.value + price.getValue());
  }

  subtract(price: Price): Price {
    return new Price(this.value - price.getValue());
  }
}