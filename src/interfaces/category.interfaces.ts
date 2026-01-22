import { Document,Types } from "mongoose";
/** Category Interface */
export interface CategoryInterface {
    owner:Types.ObjectId,
    parent?:Types.ObjectId,
    title:string,
    image:string,
    status?:string,
};
/** Category Document */
export interface CategoryDocument extends CategoryInterface, Document {}
/** Category Status */
export enum CategoryStatus {
    ENABLED = "ENABLED",
    DISABLED = "DISABLED"
}