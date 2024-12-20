import { ResponseData } from "./class.global";
import { Response, Request } from "express";

export {
    headerToToken,
    sendResponseData
}

/**
 * headerToToken is used to get access token from authorization in header
 * @param request 
 * @returns null (if token is not found)
 * @returns string
 */
function headerToToken(request: Request): string {
    const authHeader = request.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.slice(7, authHeader.length);
    }
    return null;
}

function sendResponseData(response: Response, responseData: ResponseData<any>) {
    response.statusCode = responseData.statusCode;
    response.statusMessage  = responseData.message;
    response.send(responseData);
}