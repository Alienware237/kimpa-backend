import { User } from "../Modells/user.entity";

export const userProviders = [
    {
        provide: 'USER_REPOSITORY',
        useValue: User,
    },
];