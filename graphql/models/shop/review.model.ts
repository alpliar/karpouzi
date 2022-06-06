import Person from '../common/person.model';
import { Id } from '../common/types.model';

export interface ReviewExcerpt {
    id: Id;
    message?: string;
    rating: number;
    isVerified?: boolean;
    author?: Person;
}

export default interface Review {
    id: Id;
    message: string;
    rating: number;
    isVerified: boolean;
    author: Person;
}
