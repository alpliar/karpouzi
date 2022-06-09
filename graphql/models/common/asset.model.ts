import GraphCMSSystemFields from './systemFields.model';
import { Id } from './types.model';

export default interface Asset extends GraphCMSSystemFields {
    id: Id;
    url: string;
    fileName: string;
    mimeType: string;
}
