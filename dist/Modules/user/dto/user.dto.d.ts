declare enum Gender {
    MALE = "male",
    FEMALE = "female"
}
export declare class UserDto {
    private _lastName;
    private _firstName;
    private _email;
    private _password;
    private _salutation;
    private _street;
    private _houseNumber;
    private _zipCode;
    private _city;
    private _country;
    private _phone;
    private _role;
    private _cookies;
    getLastName(): string;
    setLastName(value: string): void;
    getFirstName(): string;
    setFirstName(value: string): void;
    getEmail(): string;
    setEmail(value: string): void;
    getPassword(): string;
    setPassword(value: string): void;
    getSalutation(): Gender;
    setSalutation(value: Gender): void;
    getStreet(): string;
    setStreet(value: string): void;
    getHouseNumber(): number;
    setHouseNumber(value: number): void;
    getZipCode(): string;
    setZipCode(value: string): void;
    getCity(): string;
    setCity(value: string): void;
    getCountry(): string;
    setCountry(value: string): void;
    getPhone(): string;
    setPhone(value: string): void;
    getRole(): number;
    setRole(value: number): void;
    getCookies(): string;
    setCookies(value: string): void;
}
export {};
