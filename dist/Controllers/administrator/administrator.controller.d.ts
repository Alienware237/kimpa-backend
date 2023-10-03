import { AdministratorService } from "../../Services/administrator/administrator.service";
import { Administrator } from "../../Modells/administrator.entity";
import { UpdateAdministratorDto } from '../../Modules/administrator/dto/update-administrator.dto';
import { AdministratorDto } from "../../Modules/administrator/dto/administrator.dto";
export declare class AdministratorController {
    private readonly administratorService;
    constructor(administratorService: AdministratorService);
    getAllAdmin(): Promise<Administrator[]>;
    create(createAdministratorDto: AdministratorDto): Promise<Administrator>;
    findOne(id: string): string;
    update(id: string, updateAdministratorDto: UpdateAdministratorDto): string;
    remove(id: string): string;
}
