import { gql } from '@apollo/client';
import { Asset } from '../../models/common/asset.model';

export interface GetAssetRequestVariables {
    id: Asset['id'];
}

export const GET_ASSET = gql`
    query GetAsset($id: ID!) {
        asset(where: { id: $id }) {
            id
            fileName
            mimeType
            createdAt
            url
        }
    }
`;

export interface GetAssetsRequestVariables {
    ids: Array<Asset['id']>;
}

export const GET_ASSETS = gql`
    query GetAsset($ids: [ID!]) {
        assets(where: { id_in: $ids }) {
            id
            fileName
            mimeType
            createdAt
            url
        }
    }
`;
