"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailControllerController = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("../../Services/mails/mail.service");
let MailControllerController = class MailControllerController {
    constructor(mailService) {
        this.mailService = mailService;
    }
    async sendEmail(emailData) {
        try {
            const { to, subject, text } = emailData;
            await this.mailService.sendMail(to, subject, text);
            return 'Email sent successfully';
        }
        catch (error) {
            throw new Error(`Failed to send email: ${error.message}`);
        }
    }
};
__decorate([
    (0, common_1.Post)('/send-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MailControllerController.prototype, "sendEmail", null);
MailControllerController = __decorate([
    (0, common_1.Controller)('mail'),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], MailControllerController);
exports.MailControllerController = MailControllerController;
//# sourceMappingURL=mail-controller.controller.js.map