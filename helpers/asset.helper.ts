import { getPlaiceholder } from 'plaiceholder';
import apolloClient from '../graphql/apollo-client';
import { Asset, AssetData } from '../graphql/models/common/asset.model';
import { GetAssetRequestVariables, GET_ASSET } from '../graphql/queries/asset/asset.queries';

export default class AssetHelper {
    static getAsset = async (id: Asset['id']): Promise<Asset> => {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    data: { asset }
                } = await apolloClient.query<AssetData, GetAssetRequestVariables>({
                    query: GET_ASSET,
                    variables: { id: id.toString() }
                });

                const thumbnail = await this.getThumbnail(asset.url);

                const newAsset: Asset = {
                    ...asset,
                    thumbnail
                };

                resolve(newAsset);
            } catch {
                reject(undefined);
            }
        });
    };

    static getThumbnail = async (url: string): Promise<Asset['thumbnail']> => {
        return new Promise(async (resolve, reject) => {
            try {
                const { base64 } = await getPlaiceholder(url);
                resolve(base64);
            } catch {
                reject(undefined);
            }
        });
    };
}
