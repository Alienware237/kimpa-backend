import { MailService } from "../../Services/mails/mail.service";
export declare class MailControllerController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendEmail(emailData: {
        to: string;
        subject: string;
        text: string;
    }): Promise<{
        response: string;
    }>;
}
