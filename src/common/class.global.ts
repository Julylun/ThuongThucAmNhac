import { ApiProperty } from "@nestjs/swagger";
import { HttpCode, HttpMessage } from "./enum.global";
import { Logger } from "@nestjs/common";

interface ResponseDataParams<D> {
    data: D | D[];
    statusCode: number;
    message: string | any;
}


export class ResponseData<D> {
    data: D | D[] = null;
    statusCode: number = null;
    message: string | any = null;


    constructor(params: ResponseDataParams<D> = {} as ResponseDataParams<D>) {
        this.data = (params.data) ? params.data : null;
        this.statusCode = (params.statusCode) ? params.statusCode : null;
        this.message = (params.message) ? params.message : null;

        return this;
    }

    static createResponse(error: Error | string): ResponseData<any> {
        let resonseData = null;
        new Logger("tml").debug((error instanceof Error) ? error.message : error)
        switch ((error instanceof Error) ? error.message : error) {

            //*Success cases
            case HttpMessage.OK: {
                resonseData = new ResponseData<any>({data: null, statusCode: HttpCode.OK, message: HttpMessage.OK});
                break;
            }
            case HttpMessage.CREATED: {
                resonseData = new ResponseData<any>({data: null, statusCode: HttpCode.CREATED, message: HttpMessage.CREATED});
                break;
            }
            case HttpMessage.ACCEPTED: {
                resonseData = new ResponseData<any>({data: null, statusCode: HttpCode.ACCEPTED, message: HttpMessage.ACCEPTED});
                break;
            }
            case HttpMessage.SUCCESS_WITHOUT_RETURN_DATA: {
                resonseData = new ResponseData<any>({data: null, statusCode: HttpCode.SUCCESS_WITHOUT_RETURN_DATA, message: HttpMessage.SUCCESS_WITHOUT_RETURN_DATA});
                break;
            }


            //*Client error cases
            case HttpMessage.BAD_REQUEST: {
                resonseData = new ResponseData<any>({data: null, statusCode: HttpCode.BAD_REQUEST, message: HttpMessage.BAD_REQUEST});
                break;
            }
            case HttpMessage.UNAUTHORIZED: {
                resonseData = new ResponseData<any>({data: null, statusCode: HttpCode.UNAUTHORIZED, message: HttpMessage.UNAUTHORIZED});
                break;
            }
            case HttpMessage.PAYMENT_REQUIRED: {
                resonseData = new ResponseData<any>({data: null, statusCode: HttpCode.PAYMENT_REQUIRED, message: HttpMessage.PAYMENT_REQUIRED});
                break;
            }
            case HttpMessage.FORBIDDEN: {
                resonseData = new ResponseData<any>({data: null, statusCode: HttpCode.FORBIDDEN, message: HttpMessage.FORBIDDEN});
                break;
            }
            case HttpMessage.NOT_FOUND: {
                resonseData = new ResponseData<any>({data: null, statusCode: HttpCode.NOT_FOUND, message: HttpMessage.NOT_FOUND});
                break;
            }
            case HttpMessage.METHOD_NOT_ALLOWED: {
                resonseData = new ResponseData<any>({data: null, statusCode: HttpCode.METHOD_NOT_ALLOWED, message: HttpMessage.METHOD_NOT_ALLOWED});
                break;
            }
            case HttpMessage.PAY_LOAD_TOO_LARGE: {
                resonseData = new ResponseData<any>({data: null, statusCode: HttpCode.PAY_LOAD_TOO_LARGE, message: HttpMessage.PAY_LOAD_TOO_LARGE});
                break;
            }
            case HttpMessage.UNSUPPORTED_DATA_TYPE: {
                resonseData = new ResponseData<any>({data: null, statusCode: HttpCode.UNSUPPORTED_DATA_TYPE, message: HttpMessage.UNSUPPORTED_DATA_TYPE});
                break;
            }
            case HttpMessage.TOO_MANY_REQUEST: {
                resonseData = new ResponseData<any>({data: null, statusCode: HttpCode.TOO_MANY_REQUEST, message: HttpMessage.TOO_MANY_REQUEST});
                break;
            }

            //* Server error cases
            case HttpMessage.INTERNAL_SERVER_ERROR: {
                resonseData = new ResponseData<any>({data: null, statusCode: HttpCode.INTERNAL_SERVER_ERROR, message: HttpMessage.INTERNAL_SERVER_ERROR});
                break;
            }
            case HttpMessage.BAD_GATEWAY: {
                resonseData = new ResponseData<any>({data: null, statusCode: HttpCode.BAD_GATEWAY, message: HttpMessage.BAD_GATEWAY});
                break;
            }
            case HttpMessage.SERVICE_UNAVAILABLE: {
                resonseData = new ResponseData<any>({data: null, statusCode: HttpCode.SERVICE_UNAVAILABLE, message: HttpMessage.SERVICE_UNAVAILABLE});
                break;
            }
            default: {
                resonseData = new ResponseData<any>({data: null, statusCode: HttpCode.INTERNAL_SERVER_ERROR, message: HttpMessage.INTERNAL_SERVER_ERROR});
                break;
            }
        }

        return resonseData;
    }
}