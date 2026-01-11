export interface IntegrationService {
    id: string;
    name: string;
    description: string;
    icon: string;
}

export interface Connection {
    id: string | number;
    integration: string;
    name: string;
    source: string;
    entity: string;
    interval: string;
    icon: string;
}
