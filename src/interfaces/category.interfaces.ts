import { Document,Types } from "mongoose";

/** Category Status */
export const CATEGORY_STATUS = ["ENABLED","DISABLED"] as const;
export type CategoryStatus = typeof CATEGORY_STATUS[number];

/** Category Interface */
export interface CategoryInterface {
    owner:Types.ObjectId,
    parent?:Types.ObjectId,
    title:string,
    image?:string | null,
    status?:CategoryStatus,
};
/** Category Document */
export interface CategoryDocument extends CategoryInterface, Document {}

/** Create Category Interface */
export interface CreateCategoryInterface {
    owner:string,
    parent?:string,
    title:string,
    image?:string | null,
    status:CategoryStatus
}

/** Update Category Interface */
export interface UpdateCategoryInterface {
    categoryId:string,
    parent?:string,
    title:string,
    image?:string | null,
    status:CategoryStatus
}
export interface CategoryWithDescendants extends CategoryDocument {
    descendants: CategoryDocument[];
}