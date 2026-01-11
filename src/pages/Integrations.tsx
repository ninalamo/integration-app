import { useEffect, useState } from 'react';
import { getApiUrl } from '../services/api';
import ServiceCard from '../components/ServiceCard';
import type { IntegrationService, Connection } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faExternalLinkAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import EditConfirmationModal from '../components/EditConfirmationModal';
import { API_ENDPOINTS, SOURCE_TYPES, DELAY_MS, SORT_DIRECTION } from '../constants';

export default function Integrations() {
    const [services, setServices] = useState<IntegrationService[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [servicesLoading, setServicesLoading] = useState(true);
    const [connectionsLoading, setConnectionsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Sorting and Filtering State
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Connection | null; direction: typeof SORT_DIRECTION.ASC | typeof SORT_DIRECTION.DESC }>({
        key: 'integration',
        direction: SORT_DIRECTION.ASC,
    });

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Modals State
    const [connectionToDelete, setConnectionToDelete] = useState<Connection | null>(null);
    const [connectionToEdit, setConnectionToEdit] = useState<Connection | null>(null);

    useEffect(() => {
        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

        const fetchServices = async () => {
            try {
                await delay(DELAY_MS.SERVICES);
                const res = await fetch(getApiUrl(API_ENDPOINTS.CONNECTORS));
                if (!res.ok) throw new Error('Failed to fetch services');
                const data = await res.json();
                setServices(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setServicesLoading(false);
            }
        };

        const fetchConnections = async () => {
            try {
                await delay(DELAY_MS.CONNECTIONS);
                const res = await fetch(getApiUrl(API_ENDPOINTS.CONNECTIONS));
                if (!res.ok) throw new Error('Failed to fetch connections');
                const data = await res.json();
                setConnections(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setConnectionsLoading(false);
            }
        };

        fetchServices();
        fetchConnections();
    }, []);

    // Handle Sorting
    const handleSort = (key: keyof Connection) => {
        let direction: typeof SORT_DIRECTION.ASC | typeof SORT_DIRECTION.DESC = SORT_DIRECTION.ASC;
        if (sortConfig.key === key && sortConfig.direction === SORT_DIRECTION.ASC) {
            direction = SORT_DIRECTION.DESC;
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
            return sortConfig.direction === SORT_DIRECTION.ASC ? -1 : 1;
        }
        if (String(aValue).toLowerCase() > String(bValue).toLowerCase()) {
            return sortConfig.direction === SORT_DIRECTION.ASC ? 1 : -1;
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
        return <span className="ml-1">{sortConfig.direction === SORT_DIRECTION.ASC ? '↑' : '↓'}</span>;
    };

    // Reset pagination when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // Loading Components
    const ServiceSkeleton = () => (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between h-full animate-pulse">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg shrink-0"></div>
                    <div className="h-6 bg-gray-100 rounded w-1/2"></div>
                </div>
                <div className="space-y-2">
                    <div className="h-3.5 bg-gray-100 rounded w-full"></div>
                    <div className="h-3.5 bg-gray-100 rounded w-5/6"></div>
                </div>
            </div>
            <div className="mt-6">
                <div className="h-9 bg-gray-100 rounded-md w-32"></div>
            </div>
        </div>
    );

    const ConnectionSkeleton = () => (
        <tr className="animate-pulse">
            <td className="px-6 py-4"><div className="h-8 bg-gray-50 rounded-lg w-3/4"></div></td>
            <td className="px-6 py-4"><div className="h-4 bg-gray-50 rounded w-1/2"></div></td>
            <td className="px-6 py-4"><div className="h-6 bg-gray-50 rounded-full w-20"></div></td>
            <td className="px-6 py-4"><div className="h-4 bg-gray-50 rounded w-3/4"></div></td>
            <td className="px-6 py-4"><div className="h-4 bg-gray-50 rounded w-1/2"></div></td>
            <td className="px-6 py-4"><div className="h-4 bg-gray-50 rounded w-24"></div></td>
            <td className="px-6 py-4"><div className="h-8 bg-gray-50 rounded-lg w-20 ml-auto"></div></td>
        </tr>
    );

    if (error) return <div className="p-6 text-red-500 font-medium bg-red-50 border border-red-100 rounded-lg m-6">Error: {error}</div>;

    return (
        <div className="w-full">
            {/* Services Section */}
            <section className="mb-12">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Choose a Service to Connect</h2>
                    <p className="text-gray-500 text-sm mt-1">Connect BraveGen to other tools you use.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {servicesLoading ? (
                        [...Array(4)].map((_, i) => <ServiceSkeleton key={i} />)
                    ) : (
                        services.map((service) => (
                            <ServiceCard
                                key={service.name}
                                name={service.name}
                                description={service.description}
                                icon={service.icon}
                            />
                        ))
                    )}
                </div>
            </section>

            {/* Existing Connections Section */}
            <section className="pb-20">
                <div className="mb-6 space-y-4 text-left">
                    <h2 className="text-lg font-bold text-gray-900">Existing Connections</h2>

                    {/* Search */}
                    <div className="relative w-full max-w-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 sm:text-sm transition-all shadow-sm"
                            placeholder="Search by Integration or Name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="bg-gray-50/80 border-b border-gray-200">
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('integration')}>
                                        <div className="flex items-center gap-1">
                                            Integration {renderSortIcon('integration')}
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('name')}>
                                        <div className="flex items-center gap-1">
                                            Name {renderSortIcon('name')}
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('source')}>
                                        <div className="flex items-center gap-1">
                                            Source {renderSortIcon('source')}
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('entity')}>
                                        <div className="flex items-center gap-1">
                                            Entity/Group {renderSortIcon('entity')}
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('interval')}>
                                        <div className="flex items-center gap-1">
                                            Interval {renderSortIcon('interval')}
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-semibold">Connector URL</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Instructions</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {connectionsLoading ? (
                                    [...Array(5)].map((_, i) => <ConnectionSkeleton key={i} />)
                                ) : (
                                    currentItems.map((conn) => (
                                        <tr key={conn.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-gray-100 p-1 shadow-sm group-hover:border-gray-200 transition-all">
                                                        <img src={conn.icon} alt="" className="w-full h-full object-contain" />
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-700">{conn.integration}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-blue-600 hover:text-blue-800 cursor-pointer transition-colors underline decoration-blue-200 hover:decoration-blue-800 underline-offset-4">
                                                    {conn.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${conn.source === SOURCE_TYPES.CARBON
                                                    ? 'bg-orange-50 text-orange-700 border-orange-100'
                                                    : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${conn.source === SOURCE_TYPES.CARBON ? 'bg-orange-400' : 'bg-emerald-400'}`}></span>
                                                    {conn.source}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                {conn.entity}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                                {conn.interval}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <button className="text-blue-600 hover:text-blue-800 font-medium text-xs flex items-center gap-1 transition-colors">
                                                    Copy to Clipboard
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 cursor-pointer font-semibold text-xs transition-colors">
                                                    <span>View</span>
                                                    <FontAwesomeIcon icon={faExternalLinkAlt} className="text-[10px]" />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEditClick(conn)}
                                                        className="text-slate-500 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 rounded-lg p-1.5 h-8 w-8 flex items-center justify-center transition-all shadow-sm hover:shadow-md active:scale-95"
                                                        title="Edit Connection"
                                                    >
                                                        <FontAwesomeIcon icon={faPen} className="text-[12px]" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(conn)}
                                                        className="text-white bg-red-600 hover:bg-red-700 rounded-lg p-1.5 h-8 w-8 flex items-center justify-center transition-all shadow-sm hover:shadow-md active:scale-95 border border-red-700"
                                                        title="Delete Connection"
                                                    >
                                                        <FontAwesomeIcon icon={faTrashAlt} className="text-[12px]" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
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
