import { Request } from "express";
import { TokenException } from "./exceptions/TokenException";

export class HttpRequest {
  public static getTokenFromRequest = (req: Request): string => {
    const authorizationHeader = req.headers["authorization"] || "";

    if(authorizationHeader.startsWith("Bearer ")) {
      return authorizationHeader.slice(7);
    }else {
      throw new TokenException("Required token");
    }
  }
}