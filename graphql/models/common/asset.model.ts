import GraphCMSSystemFields from './systemFields.model';
import { Id } from './types.model';

export interface Asset extends GraphCMSAsset {
    thumbnail: string;
}

export default interface GraphCMSAsset extends GraphCMSSystemFields {
    id: Id;
    url: string;
    fileName: string;
    mimeType: string;
}

export interface AssetData {
    asset: GraphCMSAsset;
}
