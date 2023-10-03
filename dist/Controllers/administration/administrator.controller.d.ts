import { AdministratorService } from "../../Services/administrator/administrator.service";
import { Administrator } from "../../Modells/administrator.entity";
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
export declare class AdministratorController {
    private readonly administratorService;
    constructor(administratorService: AdministratorService);
    getAllAdmin(): Promise<Administrator[]>;
    create(createAdministratorDto: CreateAdministratorDto): string;
    findOne(id: string): string;
    update(id: string, updateAdministratorDto: UpdateAdministratorDto): string;
    remove(id: string): string;
}
