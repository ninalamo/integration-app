import { Outlet } from 'react-router-dom';
import PrimarySidebar from './PrimarySidebar';
import SecondarySidebar from './SecondarySidebar';
import TopHeader from './TopHeader';

export default function MainLayout() {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-white">
            {/* 1. Primary Dark Sidebar (Fixed width) */}
            <PrimarySidebar />

            {/* 2. Secondary Light Sidebar (Fixed width) */}
            <SecondarySidebar />

            {/* 3. Main Content Area (Flex grow) */}
            <div className="flex flex-col flex-1 h-full overflow-hidden">
                {/* Top Header */}
                <TopHeader />

                {/* Page Content Scrollable Area */}
                <main className="flex-1 overflow-auto bg-gray-50 p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
