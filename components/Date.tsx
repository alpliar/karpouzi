import { intlFormat, parseISO } from 'date-fns';
import { useIntl } from 'react-intl';

export default function Date({ dateString }: { dateString: string }) {
    const { locale } = useIntl();
    const date = parseISO(dateString);

    return (
        <time dateTime={dateString}>
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
        </time>
    );
}
