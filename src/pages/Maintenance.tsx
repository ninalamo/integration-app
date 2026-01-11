import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools } from '@fortawesome/free-solid-svg-icons';

export default function Maintenance() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
                <FontAwesomeIcon icon={faTools} className="text-4xl text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">Under Maintenance</h2>
            <p className="mt-2 text-sm">This page is currently being updated.</p>
        </div>
    );
}
