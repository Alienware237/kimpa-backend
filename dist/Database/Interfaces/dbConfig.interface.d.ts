export interface IDatabaseConfigAttributes {
    dialect?: string;
    host?: string;
    port?: number | String;
    username?: string;
    password: string;
    database?: string;
    urlDatabase?: string;
}
export interface IDatabaseConfig {
    development: IDatabaseConfigAttributes;
    test: IDatabaseConfigAttributes;
    production: IDatabaseConfigAttributes;
}
