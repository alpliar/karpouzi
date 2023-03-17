import { Text } from '@chakra-ui/react';
import { intlFormat, parseISO } from 'date-fns';
import { useIntl } from 'react-intl';

interface DateProps {
    dateString: string;
}

const Date: React.FC<DateProps> = ({ dateString }) => {
    const { locale } = useIntl();
    const date = parseISO(dateString);

    return (
        <Text as="time" dateTime={dateString}>
            {intlFormat(
                date,
                {
                    weekday: 'short',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                },
                { locale }
            )}
        </Text>
    );
};

export default Date;
