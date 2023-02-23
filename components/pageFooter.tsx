import { useRouter } from 'next/router';
import BackToHome from './backToHome';
import Section from './layout/Section';

const Footer = () => {
    const router = useRouter();
    const isHome = router.pathname === '/';
    const copyrightMention = `© Karpouzi ${new Date().getFullYear()}`;

    return (
        <>
            <Section
                colorScheme="gray"
                section={{
                    title: 'bottomOfPage',
                    description: copyrightMention,
                    component: !isHome && <BackToHome />
                }}
            />
        </>
    );
};

export default Footer;
