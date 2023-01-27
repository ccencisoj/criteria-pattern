import { BaseEntity } from "../common/BaseEntity";

export class User extends BaseEntity {
  public username: string;
  public email: string;
  public password: string;
  
  public setUsername = (username: string): void => {
    this.username = username;
  }

  public setEmail = (email: string): void => {
    this.email = email;
  }

  public setPassword = (password: string): void => {
    this.password = password;
  }

  public toJSON = (): Partial<User> => {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      isDeleted: this.isDeleted
    }
  }
}
