import bcrypt from "bcrypt";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";

export class HelperFunctions {
  public static generateId = (): string => {
    return uuidv4();
  }

  public static getCurrentDate = (): string => {
    return new Date().toString();
  } 
}
