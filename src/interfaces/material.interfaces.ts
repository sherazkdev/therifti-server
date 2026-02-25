import type { Types,Document } from "mongoose"

export const MATERIAL_STATUS = ["ENABLED","DISBALED"] as const;
export type MaterialStatus = typeof MATERIAL_STATUS[number];

/** Note: Material Interface */
export interface MaterialInterface {
    categoryId:Types.ObjectId,
    material:string,
    status?:MaterialStatus,
    createdAt:Date,
    updatedDate:Date
};

export interface MaterialDocument extends MaterialInterface, Document {};

/** Note: Create Material Interface. */
export interface CreateMaterialInterface {
    categoryId:string,
    material:string,
    status:MaterialStatus
};

/** Note: Update Material Interface. */
export interface UpdateMaterialInterface {
    materialId:string,
    categoryId:string,
    material:string,
    status:MaterialStatus
};

/** Note: Get Material By Category Interface. */
export interface GetMaterialByCategoryInterface {
    categoryId:string
};

/** Note: Delete Material Interface */
export interface DeleteMaterialInterface {
    materialId:string
}

/** Note: Get Materials Intercae */
export interface GetMaterialInterface {
    page:number,
    limit:number,
    userId?:string
}