import { Inject, Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { headerToToken } from "../../../common/function.global";
import { Request, Response } from "express";
import { HttpCode, HttpMessage } from "../../../common/enum.global";
import { ResponseData } from "../../../common/class.global";
import { AccesstokenService } from "src/modules/auth/accesstoken/accesstoken.service";
import { log } from "console";

@Injectable()
export class JwtMiddleWare implements NestMiddleware {
    constructor(
        private accessTokenService: AccesstokenService
    ) { }

    private logger = new Logger(JwtMiddleWare.name);

    use(req: Request, res: Response, next: (error?: Error | any) => void) {
        try {
            log(req.ip + " - Start a request")
            let accessToken = headerToToken(req)
            if (accessToken == null) {
                throw new Error("Access token is null")
            }
            this.accessTokenService.verify(accessToken)
            log(req.ip + " - Access token is valid")
        } catch (e) {
            this.logger.error(e.message)
            this.logger.error(req.ip + " - Access token is invalid")
            res.status(HttpCode.UNAUTHORIZED)
            res.statusMessage = HttpMessage.UNAUTHORIZED
            res.send(new ResponseData({ data: {}, statusCode: HttpCode.UNAUTHORIZED, message: HttpMessage.UNAUTHORIZED }))
            return
        }
        next()
    }
}