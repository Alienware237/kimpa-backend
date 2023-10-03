import {IsEmail, IsEnum, IsNotEmpty, MinLength} from "class-validator";

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export class UserDto {
    private _lastName: string;
    private _firstName: string;
    private _email: string;
    private _password: string;
    private _salutation: Gender;
    private _street: string;
    private _houseNumber: number;
    private _zipCode: string;
    private _city: string;
    private _country: string;
    private _phone: string;
    private _role: number;
    private _cookies: string;

    getLastName(): string {
        return this._lastName;
    }
    setLastName(value: string) {
        this._lastName = value;
    }

    getFirstName(): string {
        return this._firstName;
    }
    setFirstName(value: string) {
        this._firstName = value;
    }

    getEmail(): string {
        return this._email;
    }
    setEmail(value: string) {
        this._email = value;
    }

    getPassword(): string {
        return this._password;
    }
    setPassword(value: string) {
        this._password = value;
    }

    getSalutation(): Gender {
        return this._salutation;
    }
    setSalutation(value: Gender) {
        this._salutation = value;
    }

    getStreet(): string {
        return this._street;
    }
    setStreet(value: string) {
        this._street = value;
    }

    getHouseNumber(): number {
        return this._houseNumber;
    }
    setHouseNumber(value: number) {
        this._houseNumber = value;
    }

    getZipCode(): string {
        return this._zipCode;
    }
    setZipCode(value: string) {
        this._zipCode = value;
    }

    getCity(): string {
        return this._city;
    }
    setCity(value: string) {
        this._city = value;
    }

    getCountry(): string {
        return this._country;
    }
    setCountry(value: string) {
        this._country = value;
    }

    getPhone(): string {
        return this._phone;
    }
    setPhone(value: string) {
        this._phone = value;
    }

    getRole(): number {
        return this._role;
    }
    setRole(value: number) {
        this._role = value;
    }

    getCookies(): string {
        return this._cookies;
    }
    setCookies(value: string) {
        this._cookies = value;
    }
}