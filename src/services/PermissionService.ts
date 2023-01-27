import { Request } from "express";
import { HttpRequest } from "../common/HttpRequest";

export class PermissionService {
  public static checkPermission = async (permissioName: string, req: Request): void => {
    const permission = process.env.SERVICE_NAME + "/" + permissioName;
    const token = await HttpRequest.getTokenFromRequest(req);
    const hasPermission = await this.hasPermission(permission, token);

    if(!hasPermission) {
      throw new PermissionException(`Required permission '${permissioName}'`);
    }
  }

  public static hasPermission = async (permission: string, token: string): void => {
    const decodedToken = await HashService.decodeToken(token);
    
    if(!(decodedToken && decodedToken.userId)) {
      throw new TokenException("Token invalid");
    }

    const userId = decodedToken.userId;
    const permissions = PermissionDAO.getUserPermissions(userId);

    return permissions.incude(permission) ? true : false;
  }
}
