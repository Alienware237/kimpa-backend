"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdministratorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_administrator_dto_1 = require("./create-administrator.dto");
class UpdateAdministratorDto extends (0, mapped_types_1.PartialType)(create_administrator_dto_1.CreateAdministratorDto) {
}
exports.UpdateAdministratorDto = UpdateAdministratorDto;
//# sourceMappingURL=update-administrator.dto.js.map