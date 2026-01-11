import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import {
    faChartLine,
    faInbox,
    faClipboardCheck,
    faTree,
    faBolt,
    faFileAlt,
    faTasks,
    faCog
} from '@fortawesome/free-solid-svg-icons';

export default function PrimarySidebar() {
    return (
        <div className="w-16 bg-[#1a202c] flex flex-col items-center py-4 text-gray-400 h-full shrink-0">
            {/* Logo */}
            <div className="mb-8 w-10 h-10 flex items-center justify-center">
                <img src="/images/Logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            </div>

            <nav className="flex-1 flex flex-col gap-6 w-full">
                <SidebarIcon icon={faChartLine} label="Insights" />
                <SidebarIcon icon={faInbox} label="Collect" />
                <SidebarIcon icon={faClipboardCheck} label="Reviews" />
                <SidebarIcon icon={faTree} label="Carbon" />
                <SidebarIcon icon={faBolt} label="Utilities" active />
                <SidebarIcon icon={faFileAlt} label="Reports" />
                <SidebarIcon icon={faTasks} label="Actions" />
            </nav>

            <div className="mt-auto mb-4">
                <NavLink to="/settings/integrations">
                    {({ isActive }: { isActive: boolean }) => (
                        <SidebarIcon icon={faCog} label="Settings" active={isActive} />
                    )}
                </NavLink>
            </div>
        </div>
    );
}

function SidebarIcon({ icon, label, active = false }: { icon: any; label: string; active?: boolean }) {
    return (
        <div className={`flex flex-col items-center gap-1 cursor-pointer group w-full py-2 ${active ? 'text-white border-l-4 border-green-500 bg-gray-800' : 'hover:text-white'}`}>
            <FontAwesomeIcon icon={icon} className="text-xl" />
            <span className="text-[10px] font-medium">{label}</span>
        </div>
    );
}
