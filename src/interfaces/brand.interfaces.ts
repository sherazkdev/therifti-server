import type {Types,Document} from "mongoose";

/** Brand Status */
export const BRAND_STATUS = ["DELETED","ENABLED","DISABLED"] as const;
export type BrandStatus = typeof BRAND_STATUS[number]

/** Brand Interface */
export interface BrandInterface {
    categoryId:Types.ObjectId,
    brand:string,
    status:BrandStatus
};

/** Brand Document */
export interface BrandDocument extends BrandInterface, Document {};

/** Note: Create Brand Interface */
export interface CreateBrandInterface {
    categoryId:string,
    brand:string,
    status:BrandStatus
}