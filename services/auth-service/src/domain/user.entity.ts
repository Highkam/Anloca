export class User {
  constructor(
    public readonly id_user: number,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly register_date: Date,
    public readonly role_id: number,
  ) {}
}
