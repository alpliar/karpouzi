import { Id } from './types.model';

export default interface Asset {
    id: Id;
    url: string;
    fileName: string;
    mimeType: string;
    createdAt: string;
}
