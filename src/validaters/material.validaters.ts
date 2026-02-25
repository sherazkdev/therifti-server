import * as z from "zod";

import { MATERIAL_STATUS } from "../interfaces/material.interfaces.js";
/** Note: Validate Create Material. */
export const VALIDATE_CREATE_MATERIAL = z.object({
    categoryId:z.string().min(24,"Error: Object id at least 24 character"),
    material:z.string(),
    status:z.enum(MATERIAL_STATUS)
});

/** Note: Validate Update Material. */
export const VALIDATE_UPDATE_MATERIAL = z.object({
    materialId:z.string().min(24,"Error: Object id at least 24 character"),
    categoryId:z.string().min(24,"Error: Object id at least 24 character"),
    material:z.string(),
    status:z.enum(MATERIAL_STATUS)
});

/** Note: Validate Delete Material. */
export const VALIDATE_DELETE_MATERIAL = z.object({
    materialId:z.string().min(24,"Error: Object id at least 24 character")
});

/** Note: Validate Get Material By Category. */
export const VALIDATE_GET_MATERIAL_BY_CATEGORY = z.object({
    categoryId:z.string().min(24,"Error: Object id at least 24 character")
});

/** Note: Validate Get Materials . */
export const VALIDATE_GET_MATERIALS = z.object({
    page:z.number().default(1),
    limit:z.number().default(20)
});
