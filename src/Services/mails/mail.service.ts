import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        // Set up nodemailer transporter (use your email and SMTP server details)
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'talomkevin2017@gmail.com',
                pass: 'O2r0n1e7l?',
            },
        });
    }

    async sendMail(to: string, subject: string, text: string): Promise<void> {
        const mailOptions = {
            from: 'talomkevin2017@gmail.com',
            to,
            subject,
            text,
        };

        await this.transporter.sendMail(mailOptions);
    }
}
