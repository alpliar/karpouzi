import { Asset } from './asset.model';

interface SeoProps {
    title: string;
    description: string;
    keywords: string[];
    openGraphImage: Asset;
}

export default SeoProps;
