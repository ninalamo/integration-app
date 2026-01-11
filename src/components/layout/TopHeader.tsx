import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faBell,
    faQuestionCircle,
    faPuzzlePiece
} from '@fortawesome/free-solid-svg-icons';

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
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center text-white text-sm font-bold cursor-pointer">
                    JA
                </div>

            </div>
        </header>
    );
}
