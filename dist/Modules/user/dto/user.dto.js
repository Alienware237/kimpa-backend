"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
})(Gender || (Gender = {}));
class UserDto {
    getLastName() {
        return this._lastName;
    }
    setLastName(value) {
        this._lastName = value;
    }
    getFirstName() {
        return this._firstName;
    }
    setFirstName(value) {
        this._firstName = value;
    }
    getEmail() {
        return this._email;
    }
    setEmail(value) {
        this._email = value;
    }
    getPassword() {
        return this._password;
    }
    setPassword(value) {
        this._password = value;
    }
    getSalutation() {
        return this._salutation;
    }
    setSalutation(value) {
        this._salutation = value;
    }
    getStreet() {
        return this._street;
    }
    setStreet(value) {
        this._street = value;
    }
    getHouseNumber() {
        return this._houseNumber;
    }
    setHouseNumber(value) {
        this._houseNumber = value;
    }
    getZipCode() {
        return this._zipCode;
    }
    setZipCode(value) {
        this._zipCode = value;
    }
    getCity() {
        return this._city;
    }
    setCity(value) {
        this._city = value;
    }
    getCountry() {
        return this._country;
    }
    setCountry(value) {
        this._country = value;
    }
    getPhone() {
        return this._phone;
    }
    setPhone(value) {
        this._phone = value;
    }
    getRole() {
        return this._role;
    }
    setRole(value) {
        this._role = value;
    }
    getCookies() {
        return this._cookies;
    }
    setCookies(value) {
        this._cookies = value;
    }
}
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map