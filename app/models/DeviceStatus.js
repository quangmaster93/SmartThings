export class DeviceStatus {
    lastMessageTs: number;

    lastActionTs: number;

    availability: string;
    
    snapshot: any;
}

export class DeviceStatusWithId {
    did: string;
    data: DeviceStatus;
}