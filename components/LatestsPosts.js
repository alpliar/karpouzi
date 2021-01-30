import Link from 'next/link';
import PropTypes from 'prop-types';
import Title from './UiTitle';

const LatestsPosts = ({ posts }) => {
    return (
        <>
            <Title rank={1}>Blog</Title>
            <ul>
                {posts.map(({ id, date, title }) => (
                    <li className="py-4" key={id}>
                        <Link href={`/posts/${id}`}>
                            <a>
                                <span className="text-xl tracking-tight font-bold">{title}</span>
                                <br />
                                {id}
                                <br />
                                {date}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
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
