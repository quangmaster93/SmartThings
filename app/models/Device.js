// @flow
export class Device {
    id: string;

    dtid: string;

    name: string;

    manifestVersion: number;

    manifestVersionPolicy: string // LATEST | DEVICE

    needProviderAuth: boolean;

    cloudAuthorization: string; // NO_AUTHORIZATION

    createdOn: number;
    
    connected: boolean;
}