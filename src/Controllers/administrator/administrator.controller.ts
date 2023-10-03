import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import {AdministratorService } from "../../Services/administrator/administrator.service";
import {Administrator} from "../../Modells/administrator.entity";
import { CreateAdministratorDto } from '../../Modules/administrator/dto/create-administrator.dto';
import { UpdateAdministratorDto } from '../../Modules/administrator/dto/update-administrator.dto';
import {AdministratorDto} from "../../Modules/administrator/dto/administrator.dto";

@Controller('administrator')
export class AdministratorController {
    constructor(private readonly administratorService: AdministratorService) {
    }

    @Get()
    getAllAdmin(): Promise<Administrator[]> {
        return this.administratorService.findAll();
    }

    @Post()
    create(@Body() createAdministratorDto: AdministratorDto) {
        return this.administratorService.create(createAdministratorDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.administratorService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAdministratorDto: UpdateAdministratorDto) {
        return this.administratorService.update(+id, updateAdministratorDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.administratorService.remove(+id);
    }
}