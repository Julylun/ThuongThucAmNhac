import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class JwtMiddleWare implements NestMiddleware {
    use(req: any, res: any, next: (error?: Error | any) => void) {

        //TODO: create JwtMiddleWare code
        next()
    }
    

}