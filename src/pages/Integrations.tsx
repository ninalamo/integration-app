import ServiceCard from '../components/ServiceCard';


export default function Integrations() {
    const services = [
        {
            name: 'Amazon QuickSight',
            description: 'Amazon BI service to create dashboards and interactive visualisations.',
            icon: '/images/image 348.png' // Educated guess, to be verified
        },
        {
            name: 'Kafka',
            description: 'Real-time data streaming, event-driven architectures and messaging systems.',
            icon: '/images/image 348 copy.png' // Educated guess
        },
        {
            name: 'Power BI',
            description: 'Microsoft BI service to create dashboards and data visualisations.',
            icon: '/images/image 348 copy 2.png' // Educated guess
        },
        {
            name: 'Zapier',
            description: 'Automation tool that connects various apps and services to automate workflows.',
            icon: '/images/image 351.png' // Educated guess
        },
        {
            name: 'Tableau',
            description: 'BI service that helps seeing and transforming data into actionable insights.',
            icon: '/images/snowflake_icon.png.png' // Temporary fallback or maybe snowflake?
        },
        {
            name: 'Measurabl',
            description: 'Enable the push and pull of data to and from Measurabl via an API.',
            icon: '/images/measurabl_icon.jpeg.png'
        }
    ];

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
