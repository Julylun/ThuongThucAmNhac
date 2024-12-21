import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { GmailController } from './gmail.controller';
import * as fs from 'fs';



let configurationData = null;
try {
    configurationData = JSON.parse(fs.readFileSync('./src/config/system.config.json').toString());
    console.log("[app.module][MY-CUSTOM-PRELOADING]: Loading configuration file...");
    // console.log(configurationData)
} catch (error) {
    console.log("[app.module][MY-CUSTOM-PRELOADING]: An error occures when loading configuration file");
    console.error(error);
}


@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    host: configurationData.mailer.host,
                    secure: true,
                    port: 465,
                    auth: {
                        user: configurationData.mailer.username,
                        pass: configurationData.mailer.password 
                    },
                },
            }),
            inject: []
        }),
    ],
    providers: [GmailService],
    controllers: [GmailController],
    exports: []
})
export class GmailModule {}
