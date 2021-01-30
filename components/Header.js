/* eslint-disable jsx-a11y/anchor-is-valid */
import { PropTypes } from 'prop-types';
const Header = ({ home }) => {
    return (
        <div className="relative bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <svg
                        className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                        fill="white"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true">
                        <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>

                    <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                        <nav
                            className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                            aria-label="Global">
                            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                                <div className="flex items-center justify-between w-full md:w-auto">
                                    <a href="#">
                                        <span className="sr-only">Workflow</span>
                                        <img
                                            alt="fzafzafzaf"
                                            className="h-8 w-auto sm:h-10"
                                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                        />
                                    </a>
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

                    {home && (
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Welcome to </span>
                                    <span className="block text-indigo-600 xl:inline">my blog</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                                    lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                                    fugiat aliqua.
                                </p>
                                {/* <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <a
                                            href="#"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                                            Get started
                                        </a>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <a
                                            href="#"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                                            Live demo
                                        </a>
                                    </div>
                                </div> */}
                            </div>
                        </main>
                    )}
                </div>
            </div>
            {home && (
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img
                        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                        src="https://images.pexels.com/photos/4974912/pexels-photo-4974912.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        alt=""
                    />
                </div>
            )}
        </div>
    );
};

export default Header;

Header.propTypes = {
    home: PropTypes.bool.isRequired
};