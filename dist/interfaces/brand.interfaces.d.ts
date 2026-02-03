import type { Document } from "mongoose";
/** Brand Status */
export declare enum BrandStatus {
    DELETED = "DELETED",
    ENABLED = "ENABLED",
    DISABLED = "DISABLED"
}
/** Brand Interface */
export interface BrandInterface {
    brand: string;
    status: BrandStatus;
}
/** Brand Document */
export interface BrandDocument extends BrandInterface, Document {
}
//# sourceMappingURL=brand.interfaces.d.ts.map