import { Id } from './types.model';

export interface PostalAddress {
    streetNumber?: number;
    streetName?: string;
    complement?: string;
    postalCode?: string;
    cityName?: string;
    countryName: string;
}

export default interface Person {
    id: Id;
    email: string;
    firstName: string;
    lastName: string;
    postalAddress: PostalAddress;
}
