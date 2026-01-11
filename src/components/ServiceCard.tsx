export interface ServiceCardProps {
    name: string;
    description: string;
    icon: string;
}

export default function ServiceCard({ name, description, icon }: ServiceCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-4">
                {/* Icon and Title Header */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center shrink-0">
                        <img src={icon} alt={`${name} icon`} className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{name}</h3>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Action Button */}
            <div className="mt-6">
                <button className="bg-[#1a202c] text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                    Add Connection
                </button>
            </div>
        </div>
    );
}
