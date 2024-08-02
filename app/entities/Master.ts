import { Client } from "./Client";

export class Master {
    masterId: number;
    masterNumber: string;
    client: Client;
    constructor(masterId: number, masterNumber: string, client:Client) {
        this.masterId = masterId;
        this.masterNumber = masterNumber;
        this.client = client;
    }
}