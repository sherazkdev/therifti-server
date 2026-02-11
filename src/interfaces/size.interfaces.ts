import type { Document,Types } from "mongoose";

/** Note: Size Interface */
export interface SizeInterface {
    categoryId:Types.ObjectId,
    international: string   // what user selects
    US?: string | null
    EU?: string | null
    UK?: string | null
    waist?: string | null
};

/** Note: SizeDocument */
export interface SizeDocument extends SizeInterface, Document {};

/** Note: Create Size Interface */
export interface CreateSizeInterface {
    categoryId:string,
    international: string
    US?: string
    EU?: string
    UK?: string
    waist?: string
}
export interface UpdateSizeInterface {
    sizeId:string,
    categoryId:string,
    international: string,
    US?: string | null,
    EU?: string | null,
    UK?: string | null,
    waist?: string | null
}
