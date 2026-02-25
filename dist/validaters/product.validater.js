import * as z from "zod";
import { PRODUCT_COLOR, PRODUCT_CONDITION, PRODUCT_MATERIAL, PRODUCT_PARCEL_SIZE, PRODUCT_SORT, PRODUCT_STATUS } from "../interfaces/product.interfaces.js";
/** Note: Validate Create Product */
export const VALIDATE_CREATE_PRODUCT = z.object({
    categoryId: z.string().min(24, "Error: Object id at least 24 character"),
    owner: z.string().min(24, "Error: Object id at least 24 character"),
    size: z.string().min(24, "Error: Object id at least 24 character"),
    brand: z.string().min(24, "Error: Object id at least 24 character"),
    title: z.string(),
    description: z.string(),
    condition: z.enum(PRODUCT_CONDITION),
    coverImage: z.string(),
    colors: z.array(z.enum(PRODUCT_COLOR)),
    parcelSize: z.enum(PRODUCT_PARCEL_SIZE),
    price: z.number(),
    status: z.enum(PRODUCT_STATUS),
    material: z.array(z.enum(PRODUCT_MATERIAL)),
});
/** Note: Validate Update Product */
export const VALIDATE_UPDATE_PRODUCT = z.object({
    productId: z.string().min(24, "Error: Object id at least 24 character"),
    categoryId: z.string().min(24, "Error: Object id at least 24 character"),
    owner: z.string().min(24, "Error: Object id at least 24 character"),
    size: z.string().min(24, "Error: Object id at least 24 character"),
    brand: z.string().min(24, "Error: Object id at least 24 character"),
    title: z.string(),
    description: z.string(),
    condition: z.enum(PRODUCT_CONDITION),
    coverImage: z.string(),
    colors: z.array(z.enum(PRODUCT_COLOR)),
    parcelSize: z.enum(PRODUCT_PARCEL_SIZE),
    price: z.number(),
    status: z.enum(PRODUCT_STATUS),
    materials: z.array(z.enum(PRODUCT_MATERIAL))
});
/** Note: Validate Get Single Product */
export const VALIDATE_GET_SINGLE_PRODUCT = z.object({
    productId: z.string().min(24, "Error: Object id at least 24 character")
});
/** Note: Validate Search Product */
export const VALIDATE_SEARCH_PRODUCT = z.object({
    q: z.string().nullable().optional(),
    categoryId: z.string().min(24, "Error: Object id at least 24 character").nullable().optional(),
    price: z.object({
        min: z.number().nullable().optional(),
        max: z.number().nullable().optional()
    }).optional(),
    materials: z.array(z.enum(PRODUCT_MATERIAL)).optional(),
    conditions: z.array(z.enum(PRODUCT_CONDITION)).optional(),
    brands: z.array(z.string().min(24, "Error: Object id at least 24 character")).nullable().optional(),
    sizes: z.array(z.string().min(24, "Error: Object id at least 24 character")).nullable().optional(),
    page: z.number().default(1),
    limit: z.number().default(50)
});
/** Note: Get Featured Products */
export const VALIDATE_GET_FEATURED_PRODUCTS = z.object({
    categoryId: z.string().min(24, "Error: Object id at least 24 character").nullable().optional(),
    price: z.object({
        min: z.number().nullable().optional(),
        max: z.number().nullable().optional()
    }).optional(),
    sizes: z.array(z.string().min(24, "Error: Object id at least 24 character")).nullable().optional(),
    sort: z.enum(PRODUCT_SORT),
    page: z.number().default(1),
    limit: z.number().default(50)
});
//# sourceMappingURL=product.validater.js.map