import { Injectable, Inject } from "@nestjs/common";
import { Administrator } from "../../Modells/administrator.entity";
import {AdministratorDto} from "../../Modules/administrator/dto/administrator.dto";
import { CreateAdministratorDto } from '../../Modules/administrator/dto/create-administrator.dto';
import { UpdateAdministratorDto } from '../../Modules/administrator/dto/update-administrator.dto';

import {ADMINISTRATOR_REPOSITORY} from "../../core/constants";

@Injectable()
export class AdministratorService {
    constructor(
        @Inject(ADMINISTRATOR_REPOSITORY)
        private readonly administratorRepository: typeof Administrator
    ) {
    }

    findOne(id: number) {
        return `This action returns a #${id} administrator`;
    }

    update(id: number, updateAdministratorDto: UpdateAdministratorDto) {
        return `This action updates a #${id} administrator`;
    }

    remove(id: number) {
        return `This action removes a #${id} administrator`;
    }


    async findAll(): Promise<Administrator[]> {
        return this.administratorRepository.findAll<Administrator>();
    }

    async create(admin: AdministratorDto): Promise<Administrator> {
        // @ts-ignore
        return await this.administratorRepository.create<Administrator>(admin);
    }

   async findOneByEmail(email: string): Promise<Administrator> {
        return await this.administratorRepository.findOne<Administrator>({rejectOnEmpty: undefined, where: { email }});
    }

    async findOneByRole(role: number): Promise<Administrator> {
        return await this.administratorRepository.findOne<Administrator>({rejectOnEmpty: undefined, where: { role }});
    }

    async findOneById(id: number): Promise<Administrator> {
        return await this.administratorRepository.findOne<Administrator>({rejectOnEmpty: undefined, where: { id }});
    }

    async findOneByVorname(lastName: string): Promise<Administrator> {
        return await this.administratorRepository.findOne<Administrator>({rejectOnEmpty: undefined, where: {lastName}});
    }
}