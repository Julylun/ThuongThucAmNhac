import { Request } from "express";

export {
    headerToToken
}

/**
 * 
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
