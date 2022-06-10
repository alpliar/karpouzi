import type { NextApiRequest, NextApiResponse } from 'next';
import { Asset } from '../../../graphql/models/common/asset.model';
import AssetHelper from '../../../helpers/asset.helper';

export interface AssetResponse {
    asset?: Asset;
    error?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<AssetResponse>) => {
    try {
        const { id } = req.query;

        const asset = await AssetHelper.getAsset(id.toString());

        res.status(200).json({
            asset
        });
    } catch (err) {
        res.status(200).json({
            error: 'Could not fetch asset'
        });
    }
};

export default handler;
