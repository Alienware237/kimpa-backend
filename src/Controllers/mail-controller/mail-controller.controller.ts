import {Body, Controller, Post} from '@nestjs/common';
import {MailService} from "../../Services/mails/mail.service";

@Controller('mail')
export class MailControllerController {
    constructor(private readonly mailService: MailService) {}

    @Post('/send-email')
    async sendEmail(@Body() emailData: {to: string, subject: string, text: string}) {
        try {
            const { to, subject, text } = emailData;
            await this.mailService.sendMail(to, subject, text);
            return {response: 'Email sent successfully !'};
        } catch (error) {
            throw new Error(`Failed to send email: ${error.message}`);
        }
    }
}
