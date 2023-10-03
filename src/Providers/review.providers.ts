import { Review} from "../Modells/review.entity";

export const reviewProviders = [
    {
        provide: 'REVIEW_REPOSITORY',
        useValue: Review,
    },
];