import * as z from "zod";

/** Note: Validate Create Size Document. */
export const VALIDATE_CREATE_SIZE_DOCUMENT = z.object({
    categoryId:z.string().length(24,"Error: Object id at least 24 character"),
    international:z.string(),
    US:z.string().nullable(),
    EU:z.string().nullable(),
    UK:z.string().nullable(),
    waist:z.string().nullable()
});

/** Note: Validate Get Size By Category Id. */
export const VALIDATE_GET_SIZES_BY_CATEGORY = z.object({
    categoryId:z.string().length(24,"Error: Object id at least 24 character")
});

/** Note: Validate Update Size Document. */
export const VALIDATE_UPDATE_SIZE_DOCUMENT = z.object({
    sizeId:z.string().length(24,"Error: Object id at least 24 character"),
    categoryId:z.string().length(24,"Error: Object id at least 24 character"),
    international:z.string(),
    US:z.string().nullable(),
    EU:z.string().nullable(),
    UK:z.string().nullable(),
    waist:z.string().nullable()
});

/** Note: Validate Delete Size. */
export const VALIDATE_DELETE_SIZE_DOCUMENT = z.object({
    sizeId:z.string().length(24,"Error: Object id at least 24 character"),
});