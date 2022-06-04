import { Breadcrumb as ChakraBreadcrumb, BreadcrumbItem } from '@chakra-ui/breadcrumb';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/layout';
import Head from 'next/head';
import Link from './link';

export interface IBreadcrumbItemProps {
    text: string;
    link?: string | undefined;
    alt?: string | undefined;
    isCurrentPage?: boolean;
}
export interface IBreadcrumbProps {
    entries: IBreadcrumbItemProps[];
}

const Breadcrumb = ({ entries }: IBreadcrumbProps) => {
    const structuredData: any = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: entries.map((entry, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: entry.text,
            item: entry.link
        }))
    };
    return (
        <>
            <Head>
                <script
                    key="breadcrumb"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </Head>
            <ChakraBreadcrumb fontSize="sm" separator={<ChevronRightIcon color="gray.500" />}>
                {entries.map(
                    (
                        { text, isCurrentPage = false, link = 'undefined', alt = 'undefined' },
                        index
                    ) => {
                        return (
                            <BreadcrumbItem key={`${text}-${index}`} isCurrentPage={isCurrentPage}>
                                {isCurrentPage ? (
                                    <Text>{text}</Text>
                                ) : (
                                    <Link href={link} alt={alt}>
                                        {text}
                                    </Link>
                                )}
                            </BreadcrumbItem>
                        );
                    }
                )}
            </ChakraBreadcrumb>
        </>
    );
};

export default Breadcrumb;
