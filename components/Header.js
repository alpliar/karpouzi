/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { PropTypes } from 'prop-types';

const Header = ({ siteTitle }) => {
    return (
        <div className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div
                    className={`relative z-10 pb-8 bg-white dark:bg-gray-800 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32`}>
                    <svg
                        className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                        fill="#1F2937"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true">
                        <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>

                    <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                        <nav
                            className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                            aria-label="Global">
                            <div className="flex items-center flex-grow flex-shrink-0">
                                <div className="flex items-center justify-between w-full md:w-auto">
                                    <Link href="/">
                                        <a className="text-xl tracking-tight font-extrabold text-indigo-600 sm:text-2xl md:text-3xl">
                                            {siteTitle}
                                        </a>
                                        {/* <img
                                            alt="fzafzafzaf"
                                            className="h-8 w-auto sm:h-10"
                                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                        /> */}
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center md:content-end md:flex-nowrap ml-5 md:ml-10 pr-0 md:pr-4">
                                <a
                                    href="#"
                                    className="m-2 font-medium text-gray-500 hover:text-gray-900">
                                    Product
                                </a>

                                <a
                                    href="#"
                                    className="m-2 font-medium text-gray-500 hover:text-gray-900">
                                    Features
                                </a>

                                <a
                                    href="#"
                                    className="m-2 font-medium text-gray-500 hover:text-gray-900">
                                    Company
                                </a>

                                <a
                                    href="#"
                                    className="m-2 font-medium
                                    inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                    Log in
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;

Header.propTypes = {
    home: PropTypes.bool.isRequired,
    siteTitle: PropTypes.string
};
