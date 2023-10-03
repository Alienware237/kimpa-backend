import { Administrator } from "../../Modells/administrator.entity";
import { AdministratorDto } from "../../Modules/administrator/dto/administrator.dto";
import { UpdateAdministratorDto } from '../../Modules/administrator/dto/update-administrator.dto';
export declare class AdministratorService {
    private readonly administratorRepository;
    constructor(administratorRepository: typeof Administrator);
    findOne(id: number): string;
    update(id: number, updateAdministratorDto: UpdateAdministratorDto): string;
    remove(id: number): string;
    findAll(): Promise<Administrator[]>;
    create(admin: AdministratorDto): Promise<Administrator>;
    findOneByEmail(email: string): Promise<Administrator>;
    findOneByRole(role: number): Promise<Administrator>;
    findOneById(id: number): Promise<Administrator>;
    findOneByVorname(lastName: string): Promise<Administrator>;
}
