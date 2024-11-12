import { Driver } from "./driver";

export class Package {
    _id: string;
    packageId: string;
    title: string;
    weight: number;
    destination: string;
    description: string;
    isAllocated: boolean;
    driverId: Driver;
    createdAt: string;

    constructor() {
        this._id = '';
        this.packageId = '';
        this.title = '';
        this.weight = 0;
        this.destination = '';
        this.description = '';
        this.isAllocated = true;
        this.driverId = new Driver();
        this.createdAt = '';
    }
}