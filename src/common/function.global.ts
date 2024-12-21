import { ResponseData } from "./class.global";
import { Response, Request } from "express";

export {
    headerToToken,
    sendResponseData,
    _Number,
    JulyDom
}

const JsDom = require('jsdom')
const { JSDOM } = JsDom;
global.DOMParser = new JSDOM().window.DOMParser;


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
    response.statusMessage = responseData.message;
    response.send(responseData);
}


class JulyDom {
    /**
     * Parse your HTML string text into Html Object
     * @param htmlText string  - your html text`
     * @returns any
     */
    static toHtmlElement(htmlText: string): Document {
        try {
            const htmlElement = new JSDOM(htmlText, { runScripts: "dangerously" });
            return htmlElement.window.document;
        } catch (error) {
            return null;
        }
    }
}


class _Number {
    /**
     * This will generate you a number has a limit digits number using for secure code.
     * @param digits 4 | 5 | 6
     * @returns 
     */
    static generateRandomNumberByDigits(digits: 4 | 5 | 6): number {
        const min: number = Math.pow(10, digits - 1);
        const max: number = Math.pow(10, digits) - 1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Transfer number to string
     * @param _number 
     * @returns 
     */
    static numberToString(_number: number): string {
        let _stringNumber: string = '';
        while (_number > 0) {

            _stringNumber = (_number % 10) + _stringNumber;
            _number /= 10;
        }
        return _stringNumber;
    }
}