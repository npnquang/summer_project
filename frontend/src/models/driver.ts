import { Package } from "./package";

export class Driver {
    _id: string;
    driverId: string;
    name: string;
    department: string;
    licence: string;
    isActive: boolean;
    assigned_packages: Package[];    
    createdAt: string;

    constructor() {
        this._id = '';
        this.driverId = '';
        this.name = '';
        this.department = '';
        this.licence = '';
        this.isActive = true;
        this.assigned_packages = [];
        this.createdAt = '';
    }

}