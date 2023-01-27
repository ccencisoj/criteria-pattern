import bcrypt from "bcrypt";

export class HashGenerator {
  public static generateHash = (value: string): string => {
    return bcrypt.hashSync(value, 8);
  }

  public static compareHash = (value: string, hash: string): boolean => {
    return bcrypt.compareSync(value, hash);
  }
}
