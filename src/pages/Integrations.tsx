import { useEffect, useState } from 'react';
import { getApiUrl } from '../services/api';
import ServiceCard from '../components/ServiceCard';
import type { IntegrationService } from '../types';

export default function Integrations() {
    const [services, setServices] = useState<IntegrationService[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(getApiUrl('/connectors'));
                if (!response.ok) {
                    throw new Error('Failed to fetch services');
                }
                const data = await response.json();
                setServices(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
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
        </div>
    );
}
