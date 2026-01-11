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
    faArrowCircleDown
} from '@fortawesome/free-solid-svg-icons';

export default function SecondarySidebar() {
    return (
        <div className="w-64 bg-gray-50 h-full border-r border-gray-200 overflow-y-auto pt-4 px-4 pb-20 shrink-0">
            <div className="flex flex-col gap-6">

                {/* Context Switcher - Mirrored from Design */}
                <div className="bg-white border border-gray-300 rounded-md px-3 py-2 flex items-center justify-between shadow-sm cursor-pointer hover:border-gray-400">
                    <span className="text-sm font-medium text-gray-700">ABC Group Ltd</span>
                    <FontAwesomeIcon icon={faArrowCircleDown} className="text-gray-400 text-sm" />
                </div>


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
