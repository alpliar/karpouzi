import { List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Link from 'next/link';

import PropTypes from 'prop-types';
// import { Card, Link as UiLink, Text } from 'theme-ui';

const LatestsPosts = ({ posts }) => {
    return (
        <List spacing={3}>
            {posts.map(({ id, date, title }) => (
                <ListItem key={id}>
                    <Text as="time" fontSize="xs" dateTime={date}>
                        {date}
                    </Text>
                    <ListIcon as={ChevronRightIcon} color="green.500" />
                    <Link href={`posts/${id}`}>
                        <a>
                            <Text isTruncated>{title}</Text>
                        </a>
                    </Link>
                </ListItem>
            ))}

            {/* <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </ListItem>
            <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Assumenda, quia temporibus eveniet a libero incidunt suscipit
            </ListItem>
            <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
            </ListItem>
            <ListItem>
                <ListIcon as={SettingsIcon} color="green.500" />
                Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
            </ListItem> */}
        </List>
    );
    // return (
    //     <>
    //         <Text
    //             sx={{
    //                 fontWeight: 'bold'
    //             }}>
    //             Blog
    //         </Text>
    //         <ul
    //             style={{
    //                 listStyleType: 'none',
    //                 padding: 0
    //             }}>
    //             {posts.map(({ id, date, title }) => (
    //                 <Link href={`/posts/${id}`} key={id}>
    //                     <Card as="li">
    //                         <UiLink href={`/posts/${id}`}>
    //                             <Text>{title}</Text>
    //                         </UiLink>
    //                         <Text>{id}</Text>
    //                         <Text>{date}</Text>
    //                     </Card>
    //                 </Link>
    //             ))}
    //         </ul>
    //     </>
    // );
};

export default LatestsPosts;

LatestsPosts.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired
        })
    )
};
