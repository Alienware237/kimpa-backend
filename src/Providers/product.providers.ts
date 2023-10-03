import { Product} from "../Modells/product.entity";

export const productProviders = [
    {
        provide: 'PRODUCT_REPOSITORY',
        useValue: Product,
    },
];