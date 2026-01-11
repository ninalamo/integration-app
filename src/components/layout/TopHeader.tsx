import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faBell,
    faQuestionCircle,
    faPuzzlePiece
} from '@fortawesome/free-solid-svg-icons';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function TopHeader() {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">

            {/* Left Side: Title */}
            <div className="flex items-center gap-6">

                {/* Page Title */}
                <div className="flex items-center gap-2 text-gray-800">
                    <FontAwesomeIcon icon={faPuzzlePiece} className="text-gray-500" />
                    <h1 className="text-lg font-bold">Integrations</h1>
                </div>

            </div>

            {/* Right Side: Actions */}
            <div className="flex items-center gap-4">

                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <FontAwesomeIcon icon={faSearch} />
                </button>

                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 relative">
                    <FontAwesomeIcon icon={faBell} />
                    <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                        3
                    </span>
                </button>

                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <FontAwesomeIcon icon={faQuestionCircle} />
                </button>

                {/* User Avatar */}
                {/* User Avatar */}
                <Menu as="div" className="relative ml-2">
                    <div>
                        <Menu.Button className="w-8 h-8 bg-[#4285F4] rounded-[4px] flex items-center justify-center text-white text-sm font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            FM
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-200">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }: { active: boolean }) => (
                                        <a
                                            href="#"
                                            className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                } block px-4 py-3 text-sm`}
                                        >
                                            Account Settings
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }: { active: boolean }) => (
                                        <a
                                            href="#"
                                            className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                } block px-4 py-3 text-sm`}
                                        >
                                            Sign Out
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>

            </div>
        </header>
    );
}
