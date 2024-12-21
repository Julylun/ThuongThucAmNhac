import { Controller, Get, Param } from '@nestjs/common';
import { GmailService } from './gmail.service';

@Controller('gmail')
export class GmailController {
    constructor(private readonly gmailService: GmailService) {}

    @Get(':address')
    testGmailService(@Param('address') address: string) {
        return this.gmailService.sendMail(address, 'ttan.lunlee@gmail.com', GmailService.MAIL_TYPE_REGISTER);
    }
}
