import {Controller, Post, UseGuards, Request, Body} from '@nestjs/common';
import {AuthService} from "../../Services/auth/auth.service";
import {AuthGuard} from "@nestjs/passport";
import {AdministratorDto} from "../../Modules/administrator/dto/administrator.dto";
import {DoesAdminExistGuard} from "../../core/Guards/does-admin-exist-guard.service";
import {UserDto} from "../../Modules/user/dto/user.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(DoesAdminExistGuard)
    @Post('admin/login')
    async loginAdmin(@Body() req) {
        console.log('credentials: ', req);
        return await this.authService.loginAdmin(req);
    }

    @UseGuards(DoesAdminExistGuard)
    @Post('signup')
    async signUp(@Body() admin: AdministratorDto) {
        return await this.authService.create(admin)
    }

    @UseGuards(DoesAdminExistGuard)
    @Post('user/login')
    async loginUser(@Request() req) {
        return await this.authService.login(req.user)
    }

}
