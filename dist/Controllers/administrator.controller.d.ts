import { AdministratorService } from "../Services/administrator.service";
import { Administrator } from "../Modells/administrator.entity";
export declare class AdministratorController {
    private readonly administratorService;
    constructor(administratorService: AdministratorService);
    getAllAdmin(): Promise<Administrator[]>;
}
