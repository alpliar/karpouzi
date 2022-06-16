import Person from './person.model';
import { Id } from './types.model';

export interface ReviewExcerpt {
    id: Id;
    message?: string;
    rating: number;
    isVerified?: boolean;
    author?: Person;
}

export default interface Review /*extends GraphCMSSystemFields*/ {
    id: Id;
    message: string;
    rating: number;
    isVerified: boolean;
    author: Person;
    createdAt: string;
}
