import * as z from "zod";
/** Note: Validate Create Size Document. */
export declare const VALIDATE_CREATE_SIZE_DOCUMENT: z.ZodObject<{
    categoryId: z.ZodString;
    international: z.ZodString;
    US: z.ZodNullable<z.ZodString>;
    EU: z.ZodNullable<z.ZodString>;
    UK: z.ZodNullable<z.ZodString>;
    waist: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
/** Note: Validate Get Size By Category Id. */
export declare const VALIDATE_GET_SIZES_BY_CATEGORY: z.ZodObject<{
    categoryId: z.ZodString;
}, z.core.$strip>;
/** Note: Validate Update Size Document. */
export declare const VALIDATE_UPDATE_SIZE_DOCUMENT: z.ZodObject<{
    sizeId: z.ZodString;
    categoryId: z.ZodString;
    international: z.ZodString;
    US: z.ZodNullable<z.ZodString>;
    EU: z.ZodNullable<z.ZodString>;
    UK: z.ZodNullable<z.ZodString>;
    waist: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
/** Note: Validate Delete Size. */
export declare const VALIDATE_DELETE_SIZE_DOCUMENT: z.ZodObject<{
    sizeId: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=size.validater.d.ts.map