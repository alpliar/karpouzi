import { Id } from './types.model';

export interface GraphCMSUser {
    id: Id;
    name: string;
}

export default interface GraphCMSSystemFields {
    id: Id;
    // scheduledIn: Array<unknown>;
    publishedBy?: string;
    publishedAt?: string;
    updatedBy: GraphCMSUser;
    updatedAt: string;
    createdBy: GraphCMSUser;
    createdAt: string;
}
