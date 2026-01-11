import { useEffect, useState } from 'react';
import { getApiUrl } from '../services/api';
import ServiceCard from '../components/ServiceCard';
import type { IntegrationService, Connection } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faExternalLinkAlt, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Integrations() {
    const [services, setServices] = useState<IntegrationService[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                    />
                </div>

                {/* Table */}
                <div className="bg-white shadow border border-gray-200 sm:rounded-lg overflow-hidden">

                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-3 flex items-center cursor-pointer hover:text-gray-700">
                            Integration
                            <span className="ml-1">↓</span>
                        </div>
                        <div className="col-span-2">Name</div>
                        <div className="col-span-1">Source</div>
                        <div className="col-span-2">Entity/Group</div>
                        <div className="col-span-1">Interval</div>
                        <div className="col-span-2">Connector URL</div>
                        <div className="col-span-1">Instructions</div>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-gray-200">
                        {connections.map((conn) => (
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
                                        <button className="text-gray-400 hover:text-gray-600 border border-gray-300 rounded p-1 h-7 w-7 flex items-center justify-center">
                                            <FontAwesomeIcon icon={faPen} className="text-xs" />
                                        </button>
                                        <button className="text-white bg-red-400 hover:bg-red-500 rounded p-1 h-7 w-7 flex items-center justify-center shadow-sm">
                                            <FontAwesomeIcon icon={faTrash} className="text-xs" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-center gap-2">
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50">
                            ← Previous
                        </button>
                        <button className="px-3 py-1 bg-gray-100 rounded-md text-sm font-medium text-gray-700">1</button>
                        <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-50">2</button>
                        <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-50">3</button>
                        <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-50">4</button>
                        <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-50">5</button>
                        <span className="text-gray-400">...</span>
                        <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-50">86</button>
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 font-medium">
                            Next →
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
