import { Box } from '@chakra-ui/layout';
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat';
import { chakra } from '@chakra-ui/system';

interface IShopStatProps {
    label: string;
    number: number;
}

const ShopStat = ({ label, number }: IShopStatProps) => {
    return (
        <Box>
            <Stat textAlign="right">
                <StatLabel>{label}</StatLabel>
                <StatNumber>{number}</StatNumber>
            </Stat>
        </Box>
    );
};

export default chakra(ShopStat);
