import { Breadcrumb as ChakraBreadcrumb, BreadcrumbItem } from '@chakra-ui/breadcrumb';
import { Button, ButtonProps } from '@chakra-ui/button';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/layout';
import Head from 'next/head';
import { useIntl } from 'react-intl';
import { BreadcrumbList, WithContext } from 'schema-dts';
import Link from './Link';

export interface IBreadcrumbItemProps {
    text: string;
    link?: string | undefined;
    alt?: string | undefined;
    isCurrentPage?: boolean;
}
export interface IBreadcrumbProps {
    entries: IBreadcrumbItemProps[];
}

const breadcrumbItemStyle: ButtonProps = { size: 'xs', variant: 'ghost', color: 'currentColor' };

const Breadcrumb = ({ entries }: IBreadcrumbProps) => {
    const { formatMessage } = useIntl();
    const baseUrl: string = process.env.NEXT_PUBLIC_URL || '';

    const homeCrumb = {
        text: formatMessage({ id: 'home' }),
        link: '/',
        alt: formatMessage({ id: 'goToPageName' }, { name: formatMessage({ id: 'home' }) }),
        isCurrentPage: false
    };

    const structuredData: WithContext<BreadcrumbList> = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: entries.map((entry, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: entry.text,
            item: !entry.isCurrentPage ? baseUrl + entry.link : undefined
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
            <ChakraBreadcrumb
                sx={{
                    ol: {
                        display: 'flex',
                        flexWrap: 'wrap',
                        maxWidth: 'full',
                        overflow: 'hidden'
                    }
                }}
                fontSize="sm"
                separator={<ChevronRightIcon color="currentColor" />}
                spacing={1}>
                {[homeCrumb, ...entries].map(
                    (
                        { text, isCurrentPage = false, link = 'undefined', alt = 'undefined' },
                        index
                    ) => {
                        return (
                            <BreadcrumbItem
                                key={`${text}-${index}`}
                                isCurrentPage={isCurrentPage}
                                textOverflow="ellipsis"
                                justifyItems="flex-start"
                                // _first={{
                                //     a: { paddingLeft: 0 }
                                // }}
                                //TODO: find another way to remove last item
                                _last={{
                                    display: 'none'
                                }}>
                                {isCurrentPage ? (
                                    <Button
                                        as={Text}
                                        {...breadcrumbItemStyle}
                                        fontFamily="heading"
                                        variant="text"
                                        maxW="full"
                                        textOverflow="ellipsis">
                                        {text}
                                    </Button>
                                ) : (
                                    <Link
                                        href={link}
                                        alt={alt}
                                        prefetch={false}
                                        asButton
                                        buttonProps={breadcrumbItemStyle}
                                        padding={0}>
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
