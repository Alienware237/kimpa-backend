import {Administrator} from "../Modells/administrator.entity";

export const administratorProviders = [{
    provide: 'ADMINISTRATOR_REPOSITORY',
    useValue: Administrator,
}];