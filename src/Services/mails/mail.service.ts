import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        // Set up nodemailer transporter (use your email and SMTP server details)
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'piamkevin67@gmail.com',
                pass: 'jqxk gyqn nzoh esty',
            },
        });
    }

    async sendMail(to: string, subject: string, text: string): Promise<void> {
        const mailOptions = {
            from: 'piamkevin67@gmail.com',
            to,
            subject,
            text,
        };

        await this.transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                return true;
            } else {
                console.log('Email sent: ' + info.response);
                return false;
            }
        });
    }

    async sendMailForCheckout(to: string, subject: string, text: string[]): Promise<void> {
        const mailOptions = {
            from: 'piamkevin67@gmail.com',
            to,
            subject,
            text: text.join('\n'), // Join the array elements into a single string
        };

        await this.transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                return true;
            } else {
                console.log('Email sent: ' + info.response);
                return false;
            }
        });
    }
}
