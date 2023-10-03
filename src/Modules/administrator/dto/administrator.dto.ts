import {IsEmail, IsEnum, IsNotEmpty, MinLength} from "class-validator";

enum Gender {
    MALE = 'Herr',
    FEMALE = 'Frau',
}
export class AdministratorDto {
    @IsNotEmpty()
    readonly adminId: number;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly vorname: string;

    @IsNotEmpty()
    readonly nachname: string;

    @IsNotEmpty()
    @MinLength(10)
    readonly password: string;

    @IsNotEmpty()
    @IsEnum(Gender, {
        message: 'gender must be either Herr or Frau',
    })
    readonly anrede: Gender;

    @IsNotEmpty()
    readonly strasse: string;

    @IsNotEmpty()
    readonly hausNumber: string;

    @IsNotEmpty()
    readonly plz: number;

    @IsNotEmpty()
    readonly ort: string;

    @IsNotEmpty()
    readonly land: string;

    @IsNotEmpty()
    readonly telefon: number;
}
