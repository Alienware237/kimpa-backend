import { Administrator } from "../Modells/administrator.entity";
import { AdministratorDto } from "../Modules/Administrators/dto/administrator.dto";
export declare class AdministratorService {
    private readonly administratorRepository;
    constructor(administratorRepository: typeof Administrator);
    findAll(): Promise<Administrator[]>;
    create(admin: AdministratorDto): Promise<Administrator>;
    findOneByEmail(email: string): Promise<Administrator>;
    findOneById(id: number): Promise<Administrator>;
    findOneByVorname(vorname: string): Promise<Administrator>;
}
