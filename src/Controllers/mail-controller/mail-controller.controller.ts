import {Body, Controller, Post} from '@nestjs/common';
import {MailService} from "../../Services/mails/mail.service";

@Controller('mail')
export class MailControllerController {
    constructor(private readonly mailService: MailService) {}

    @Post('/send-email')
    async sendEmail(@Body() emailData: {from: string, subject: string, text: string}): Promise<string> {
        try {
            const { from, subject, text } = emailData;
            await this.mailService.sendMail(from, subject, text);
            return 'Email sent successfully';
        } catch (error) {
            throw new Error(`Failed to send email: ${error.message}`);
        }
    }
}
