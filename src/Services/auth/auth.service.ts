import {Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import {AdministratorService} from "../administrator/administrator.service";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {userProviders} from "../../Providers/user.provider";

@Injectable()
export class AuthService {
    constructor(
        private readonly adminService: AdministratorService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(adminVorname: string, pass: string) {
        // find if Administrator exist with this firtsname
        const admin = await this.userService.find(adminVorname, pass)
        if (!admin) {
            return null;
        }

        //find if Administrator password match
        const match = await this.comparePassword(pass, admin.password);
        if (!match) {
            return null;
        }

        //tslint:disable-next-line: no-string-literal
        const {password, ...result } = admin['dataValues'];
        return result
    }

    async verifyToken(token:string) {
        console.log('Payload: ', token);
        return this.jwtService.verifyAsync(token, {secret: 'Kimpa-shopping'});
    }

    public async login(admin) {
        const token = await  this.generateToken(admin);
        return { admin, token};
    }


    async loginAdmin(credentials: any): Promise<any> {
        console.log('credentials: ', credentials);
        const { email, password } = credentials;
        const user = await this.userService.find(email, password);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials User don\'t exist');
        }

        // Generate a JWT token with the user's data as the payload
        const token = await this.createToken({ sub: (await user).email, email: (await user).password });
        return { user, token };
    }

    async createToken(payload: any): Promise<string> {
        return this.jwtService.signAsync(payload, {secret: 'Kimpa-shopping', privateKey: 'Kimpa-shopping'});
    }


    public async create(admin) {
        // hash the password
        const pass = await this.hashPassword(admin.password);

        // create the admin
        const newAdmin = await this.adminService.create({...admin, password: pass});

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = newAdmin['dataValues'];

        // generate token
        const token = await this.generateToken(result);

        // return the admin and the token
        return { admin: result, token };
    }

    private async generateToken(admin) {
        const token = await this.jwtService.signAsync(admin);
        return token;
    }

    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }


    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}
