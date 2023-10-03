"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.administratorProviders = void 0;
const administrator_entity_1 = require("../Modells/administrator.entity");
exports.administratorProviders = [{
        provide: 'ADMINISTRATOR_REPOSITORY',
        useValue: administrator_entity_1.Administrator,
    }];
//# sourceMappingURL=administrator.providers.js.map