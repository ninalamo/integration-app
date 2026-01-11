import { useEffect, useState } from 'react';
import { getApiUrl } from '../services/api';
import ServiceCard from '../components/ServiceCard';
import type { IntegrationService, Connection } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faExternalLinkAlt, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import EditConfirmationModal from '../components/EditConfirmationModal';

export default function Integrations() {
    const [services, setServices] = useState<IntegrationService[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Sorting and Filtering State
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Connection | null; direction: 'asc' | 'desc' }>({
        key: 'integration',
        direction: 'asc',
    });

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Modals State
    const [connectionToDelete, setConnectionToDelete] = useState<Connection | null>(null);
    const [connectionToEdit, setConnectionToEdit] = useState<Connection | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesRes, connectionsRes] = await Promise.all([
                    fetch(getApiUrl('/connectors')),
                    fetch(getApiUrl('/connections'))
                ]);

                if (!servicesRes.ok || !connectionsRes.ok) {
                    throw new Error('Failed to fetch data');
                }

                const servicesData = await servicesRes.json();
                const connectionsData = await connectionsRes.json();

                setServices(servicesData);
                setConnections(connectionsData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle Sorting
    const handleSort = (key: keyof Connection) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Filter and Sort Connections
    const filteredConnections = connections.filter((conn) =>
        conn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conn.integration.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedConnections = [...filteredConnections].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (String(aValue).toLowerCase() < String(bValue).toLowerCase()) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (String(aValue).toLowerCase() > String(bValue).toLowerCase()) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedConnections.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedConnections.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Delete Handlers
    const handleDeleteClick = (connection: Connection) => {
        setConnectionToDelete(connection);
    };

    const handleConfirmDelete = async () => {
        if (!connectionToDelete) return;

        try {
            await fetch(getApiUrl(`/connections/${connectionToDelete.id}`), {
                method: 'DELETE',
            });

            setConnections((prev) => prev.filter((c) => c.id !== connectionToDelete.id));
            setConnectionToDelete(null);
        } catch (err) {
            console.error('Failed to delete connection:', err);
            // In a real app, you might show an error toast here
        }
    };

    // Edit Handlers
    const handleEditClick = (connection: Connection) => {
        setConnectionToEdit(connection);
    };

    const handleConfirmEdit = () => {
        // Here you would typically navigate to an edit page or open another modal for editing
        // For now, we'll just close the confirmation modal as per the requirement
        console.log('Confirmed edit for:', connectionToEdit?.name);
        setConnectionToEdit(null);
    };

    // Helper to render sort arrow
    const renderSortIcon = (key: keyof Connection) => {
        if (sortConfig.key !== key) return null;
        return <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>;
    };

    // Reset pagination when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    if (loading) return <div className="p-6 text-gray-500">Loading services...</div>;
    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

    return (
        <div className="max-w-7xl mx-auto">
            {/* Services Section */}
            <section className="mb-12">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Choose a Service to Connect</h2>
                    <p className="text-gray-500 text-sm mt-1">Connect BraveGen to other tools you use.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <ServiceCard
                            key={service.name}
                            name={service.name}
                            description={service.description}
                            icon={service.icon}
                        />
                    ))}
                </div>
            </section>

            {/* Existing Connections Section */}
            <section className="pb-20">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Existing Connections</h2>

                {/* Search */}
                <div className="relative mb-6 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 focus:border-blue-300 focus:ring-blue-300 sm:text-sm transition duration-150 ease-in-out"
                        placeholder="Integration or Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Table */}
                <div className="bg-white shadow border border-gray-200 sm:rounded-lg overflow-hidden">

                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider grid grid-cols-12 gap-4 items-center select-none">
                        <div className="col-span-3 flex items-center cursor-pointer hover:text-gray-700" onClick={() => handleSort('integration')}>
                            Integration {renderSortIcon('integration')}
                        </div>
                        <div className="col-span-2 cursor-pointer hover:text-gray-700" onClick={() => handleSort('name')}>
                            Name {renderSortIcon('name')}
                        </div>
                        <div className="col-span-1 cursor-pointer hover:text-gray-700" onClick={() => handleSort('source')}>
                            Source {renderSortIcon('source')}
                        </div>
                        <div className="col-span-2 cursor-pointer hover:text-gray-700" onClick={() => handleSort('entity')}>
                            Entity/Group {renderSortIcon('entity')}
                        </div>
                        <div className="col-span-1 cursor-pointer hover:text-gray-700" onClick={() => handleSort('interval')}>
                            Interval {renderSortIcon('interval')}
                        </div>
                        <div className="col-span-2">Connector URL</div>
                        <div className="col-span-1">Instructions</div>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-gray-200">
                        {currentItems.map((conn) => (
                            <div key={conn.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors text-sm text-gray-700">
                                {/* Integration */}
                                <div className="col-span-3 flex items-center gap-3">
                                    <div className="w-6 h-6 flex items-center justify-center bg-white rounded-sm border border-gray-100 p-0.5 shrink-0">
                                        <img src={conn.icon} alt="" className="w-full h-full object-contain" />
                                    </div>
                                    <span className="truncate" title={conn.integration}>{conn.integration}</span>
                                </div>

                                {/* Name */}
                                <div className="col-span-2 text-blue-500 hover:underline cursor-pointer truncate" title={conn.name}>
                                    {conn.name}
                                </div>

                                {/* Source Tag */}
                                <div className="col-span-1">
                                    <span className={`px-2 py-1 rounded text-xs font-medium border ${conn.source === 'Carbon'
                                        ? 'bg-orange-50 text-orange-600 border-orange-200'
                                        : 'bg-teal-50 text-teal-600 border-teal-200'
                                        }`}>
                                        {conn.source}
                                    </span>
                                </div>

                                {/* Entity */}
                                <div className="col-span-2 truncate" title={conn.entity}>
                                    {conn.entity}
                                </div>

                                {/* Interval */}
                                <div className="col-span-1 text-gray-500">
                                    {conn.interval}
                                </div>

                                {/* Connector URL */}
                                <div className="col-span-2">
                                    <span className="text-blue-500 hover:text-blue-700 cursor-pointer text-xs">Copy to Clipboard</span>
                                </div>

                                {/* Instructions & Actions */}
                                <div className="col-span-1 flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-blue-500 hover:text-blue-700 cursor-pointer">
                                        <span>View</span>
                                        <FontAwesomeIcon icon={faExternalLinkAlt} className="text-[10px]" />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEditClick(conn)}
                                            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-lg p-1 h-8 w-8 flex items-center justify-center transition-all active:scale-95"
                                            title="Edit Connection"
                                        >
                                            <FontAwesomeIcon icon={faPen} className="text-[12px]" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(conn)}
                                            className="text-white bg-rose-500 hover:bg-rose-600 rounded-lg p-1 h-8 w-8 flex items-center justify-center shadow-sm transition-all active:scale-95"
                                            title="Delete Connection"
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="text-[12px]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 border border-gray-300 rounded-md text-sm ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                ← Previous
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === index + 1
                                        ? 'bg-gray-100 text-gray-700'
                                        : 'text-gray-500 hover:bg-gray-50'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 border border-gray-300 rounded-md text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Modals */}
            <DeleteConfirmationModal
                isOpen={!!connectionToDelete}
                onClose={() => setConnectionToDelete(null)}
                onConfirm={handleConfirmDelete}
                connectionName={connectionToDelete?.name || ''}
                integrationName={connectionToDelete?.integration || ''}
            />

            <EditConfirmationModal
                isOpen={!!connectionToEdit}
                onClose={() => setConnectionToEdit(null)}
                onConfirm={handleConfirmEdit}
                connectionName={connectionToEdit?.name || ''}
                integrationName={connectionToEdit?.integration || ''}
            />
        </div>
    );
}
