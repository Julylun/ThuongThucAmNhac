import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { _Number, JulyDom } from '../../common/function.global';
import * as fs from 'fs';


const JsDom = require('jsdom')
const { JSDOM } = JsDom;
global.DOMParser = new JSDOM().window.DOMParser;


@Injectable()
export class GmailService {
    constructor(private readonly mailerService: MailerService) { }

    private readonly logger: Logger = new Logger(GmailService.name);

    public static MAIL_TYPE_REGISTER = 0;
    public static MAIL_TYPE_FORGET_PASSWORD = 1



    getHtmlMail(mailName: string): string {
        let mailText = fs.readFileSync('src/modules/gmail/data/' + mailName + '.mail.html').toString();
        return mailText;
    }

    getMailDataJson(): any {
        try {
            let jsonData = fs.readFileSync('src/modules/gmail/data/mail.data.json').toString();
            let jsonObject = JSON.parse(jsonData);
            this.logger.debug('[getEmailDataJson]: get and parse data completed.');
            console.log(jsonObject);
            return jsonObject;
        } catch (error) {
            this.logger.error('[getMailDataJson]: An error occured while getting data from mail.data.json.')
            this.logger.error(error);
            return null;
        }
    }

    stringToHtml(htmlText: string): any {
        try {
            const htmlElement = new JSDOM(htmlText, { runScripts: "dangerously" });
            return htmlElement;
        } catch (error) {
            this.logger.error(error);
            return null;
        }
    }

    async sendMail(targetAddress: string, fromAddress: string, mailType: number, secureCode: number) {
        try {
            let mailDataObject = this.getMailDataJson();
            switch (mailType) {
                case GmailService.MAIL_TYPE_REGISTER: {
                    mailDataObject = mailDataObject.register;
                    break;
                }
                case GmailService.MAIL_TYPE_FORGET_PASSWORD: {
                    mailDataObject = mailDataObject.forgetPassword;
                    break;
                }
                default: {
                    throw new Error("Co cai nit");
                }
            }

            let htmlText: string = this.getHtmlMail(mailDataObject.html);
            let text: string = mailDataObject.text;
            // let htmlElement = this.stringToHtml(htmlText);
            let htmlElement = JulyDom.toHtmlElement(htmlText);

            if (mailType == GmailService.MAIL_TYPE_REGISTER) {
                // let secureCode = _Number.generateRandomNumberByDigits(4)
                htmlElement.getElementById('secure-code').innerHTML = secureCode + ''
                text += secureCode;
                htmlText = htmlElement.documentElement.outerHTML;
                // console.log(typeof(htmlElement))
                // htmlElement.querySelector('#secure-code').textContent = '1234'
            }


            await this.mailerService.sendMail({
                to: targetAddress,
                from: mailDataObject.from + '<' + fromAddress + '>',
                subject: mailDataObject.subject,
                text: text,
                html: htmlText
            });

            this.logger.debug('[sendMail]: Sent email to ' + targetAddress);
            return true;
        } catch (error) {
            this.logger.error('[sendMail]: Got an error while sending email to user ' + targetAddress);
            this.logger.error(error);
            return false;
        }
    }
}
