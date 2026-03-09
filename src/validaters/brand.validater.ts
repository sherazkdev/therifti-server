import * as z from "zod";

import { BRAND_STATUS } from "../interfaces/brand.interfaces.js";

/** Note: Validate Create Brand Document. */
export const VALIDATE_CREATE_BRAND_DOCUMENT = z.object({
    categoryId:z.string().length(24,"Error: Object id at least 24 character"),
    brand:z.string(),
    status:z.enum(BRAND_STATUS)
});

/** Note: Validate Update Brand Document. */
export const VALIDATE_UPDATE_BRAND_DOCUMENT = z.object({
    brandId:z.string().length(24,"Error: Object id at least 24 character"),
    categoryId:z.string().length(24,"Error: Object id at least 24 character"),
    brand:z.string(),
    status:z.enum(BRAND_STATUS)
});

/** Note: Validate Get Brand By Category. */
export const VALIDATE_GET_BRAND_BY_CATEGORY = z.object({
    categoryId:z.string().length(24,"Error: Object id at least 24 character"),
});

/** Note: Validate Delete Size Document. */
export const VALIDATE_DELETE_BRAND_DOCUMENT = z.object({
    brandId:z.string().length(24,"Error: Object id at least 24 character")
});
