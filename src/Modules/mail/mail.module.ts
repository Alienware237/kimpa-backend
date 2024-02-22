import { Module } from '@nestjs/common';
import {MailService} from "../../Services/mails/mail.service";
import {MailControllerController} from "../../Controllers/mail-controller/mail-controller.controller";

@Module({
    providers: [MailService],
    controllers: [MailControllerController],
})
export class MailModule {}
