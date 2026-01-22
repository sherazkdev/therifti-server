import type {Types,Document} from "mongoose";

/** Brand Status */
export enum BrandStatus {
    DELETED = "DELETED",
    ENABLED = "ENABLED",
    DISABLED = "DISABLED"
};

/** Brand Interface */
export interface BrandInterface {
    brand:string,
    status:BrandStatus
};

/** Brand Document */
export interface BrandDocument extends BrandInterface, Document {};