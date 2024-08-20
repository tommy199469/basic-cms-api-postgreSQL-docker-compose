import { Action } from "routing-controllers";

import { decodeJWT, handleErrorResponse } from "../utils";
export async function authorizationChecker(
  action: Action,
  roles: string[]
): Promise<boolean> {
  const request = action.request;
  const token = request.headers["authorization"]?.split(" ")[1]; // Extract token from the Authorization header

  if (!token) {
    return false; // No token provided, deny access
  }

  try {
    const decoded: any = decodeJWT(token);
    request.user = decoded;

    return true;
  } catch (error) {
    return false;
  }
}

export function jwtRequired(
  request: any,
  response: any,
  next?: (err?: any) => any
): any {
  const token = request.headers["authorization"]?.split(" ")[1]; // Extract token from the Authorization header

  if (!token) {
    return handleErrorResponse(response, 401, "jwt_undefined");
  }

  try {
    const decoded: any = decodeJWT(token);
    request.user = decoded;
    next();
  } catch (error) {
    return handleErrorResponse(response, 401, "jwt_undefined");
  }
}
