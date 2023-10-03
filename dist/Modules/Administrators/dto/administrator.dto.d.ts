declare enum Gender {
    MALE = "male",
    FEMALE = "female"
}
export declare class AdministratorDto {
    readonly adminId: number;
    readonly email: string;
    readonly vorname: string;
    readonly nachname: string;
    readonly password: string;
    readonly anrede: Gender;
    readonly strasse: string;
    readonly hausnummer: string;
    readonly plz: number;
    readonly ort: string;
    readonly land: string;
    readonly telefon: number;
}
export {};
