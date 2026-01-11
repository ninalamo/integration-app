import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faUsers,
    faTags,
    faPuzzlePiece,
    faCog,
    faSitemap,
    faBuilding,
    faList,
    faLeaf,
    faCamera,
    faDesktop,
    faSearch,
    faChevronUp,
    faArrowCircleDown
} from '@fortawesome/free-solid-svg-icons';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function SecondarySidebar() {
    return (
        <div className="w-64 bg-gray-50 h-full border-r border-gray-200 overflow-y-auto pt-4 px-4 pb-20 shrink-0">
            <div className="flex flex-col gap-6">

                {/* Context Switcher - Mirrored from Design */}
                {/* Context Switcher - Mirrored from Design */}
                <Menu as="div" className="relative w-full text-left">
                    {({ open }) => (
                        <>
                            <div>
                                <Menu.Button className={`w-full rounded px-3 py-2 flex items-center justify-between shadow-sm transition-colors focus:outline-none ${open
                                    ? 'bg-[#76a863] text-white border border-[#76a863] ring-2 ring-offset-2 ring-[#76a863]'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                                    }`}>
                                    <span className={`text-sm ${open ? 'font-semibold' : 'font-medium'}`}>Swathy Corp 2</span>
                                    {open ? (
                                        <FontAwesomeIcon icon={faChevronUp} className="text-white text-xs border border-white rounded-full p-0.5" />
                                    ) : (
                                        <FontAwesomeIcon icon={faArrowCircleDown} className="text-gray-400 text-sm" />
                                    )}
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
                                <Menu.Items className="absolute left-0 mt-2 w-72 origin-top-left bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                    {/* Static Menu Options */}
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }: { active: boolean }) => (
                                                <a href="#" className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}>
                                                    Help & Guides
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }: { active: boolean }) => (
                                                <a href="#" className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}>
                                                    Terms of Use
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }: { active: boolean }) => (
                                                <a href="#" className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}>
                                                    Privacy Policy
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </div>

                                    {/* Search */}
                                    <div className="p-2 border-t border-gray-100">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 focus:border-blue-300 focus:ring-blue-300 sm:text-sm transition duration-150 ease-in-out"
                                                placeholder="Type to filter..."
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tenants List */}
                                    <div className="py-1 max-h-60 overflow-y-auto">
                                        {[
                                            { name: 'Adhesif Labels Ltd', id: 'AL', color: 'bg-blue-500' },
                                            { name: 'AIA Services New Zealand Limited', id: 'AS', color: 'bg-blue-500' },
                                            { name: 'Air New Zealand Ltd', id: 'AN', color: 'bg-blue-500' },
                                            { name: 'All Blacks Organization', id: 'AB', color: 'bg-blue-500' },
                                            { name: 'All Hands Demo Limited', id: 'AH', color: 'bg-blue-500' },
                                        ].map((tenant) => (
                                            <Menu.Item key={tenant.name}>
                                                {({ active }: { active: boolean }) => (
                                                    <a
                                                        href="#"
                                                        className={`${active ? 'bg-gray-50' : ''
                                                            } flex items-center px-4 py-2 text-sm text-gray-700 gap-3 group`}
                                                    >
                                                        <span className={`${tenant.color} text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded shrink-0`}>
                                                            {tenant.id}
                                                        </span>
                                                        <span className="truncate">{tenant.name}</span>
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>


                {/* Organisation Section */}
                <MenuSection title="Organisation">
                    <MenuItem icon={faHome} label="Manage" />
                    <MenuItem icon={faUsers} label="Users" />
                    <MenuItem icon={faTags} label="Tags" />
                    <MenuItem icon={faPuzzlePiece} label="Integrations" active />
                </MenuSection>

                {/* Utilities Section */}
                <MenuSection title="Utilities">
                    <MenuItem icon={faCog} label="Configuration" />
                    <MenuItem icon={faSitemap} label="Hierarchy" />
                    <MenuItem icon={faBuilding} label="Assets" />
                </MenuSection>

                {/* Carbon Section */}
                <MenuSection title="Carbon">
                    <MenuItem icon={faCog} label="Configuration" />
                    <MenuItem icon={faSitemap} label="Hierarchy" />
                    <MenuItem icon={faList} label="Inventory Items" />
                    <MenuItem icon={faLeaf} label="Emission Factors" />
                    <MenuItem icon={faCamera} label="Snapshots" />
                </MenuSection>

                {/* Displays Section */}
                <MenuSection title="Displays">
                    <MenuItem icon={faDesktop} label="Manage" />
                </MenuSection>

            </div>
        </div>
    );
}

function MenuSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-3">{title}</h3>
            <div className="flex flex-col gap-1">
                {children}
            </div>
        </div>
    );
}

function MenuItem({ icon, label, active = false }: { icon: any; label: string; active?: boolean }) {
    return (
        <div
            className={`
        flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors
        ${active
                    ? 'bg-[#66bb00] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }
      `}
        >
            <FontAwesomeIcon icon={icon} className={`w-4 h-4 ${active ? 'text-white' : 'text-gray-400'}`} />
            <span className="text-sm font-medium">{label}</span>
        </div>
    );
}
