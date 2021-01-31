/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { PropTypes } from 'prop-types';
import UiHomeLogo from './UiHomeLogo';

const Header = ({ siteTitle }) => {
    return (
        <div className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="pb-8">
                    <div className=" pt-6 px-4 sm:px-6 lg:px-8">
                        <nav
                            className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                            aria-label="Global">
                            <div className="flex items-center flex-grow flex-shrink-0">
                                <div className="flex items-center justify-between w-full md:w-auto">
                                    <UiHomeLogo siteTitle={siteTitle} />
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

                                <Link href="/login">
                                    <a className="m-2 font-medium inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                        Log in
                                    </a>
                                </Link>
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
    siteTitle: PropTypes.string
};
