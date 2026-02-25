import * as z from "zod";
/** Note: Validate Create Brand Document. */
export declare const VALIDATE_CREATE_BRAND_DOCUMENT: z.ZodObject<{
    categoryId: z.ZodString;
    brand: z.ZodString;
    status: z.ZodEnum<{
        DELETED: "DELETED";
        ENABLED: "ENABLED";
        DISABLED: "DISABLED";
    }>;
}, z.core.$strip>;
/** Note: Validate Update Brand Document. */
export declare const VALIDATE_UPDATE_BRAND_DOCUMENT: z.ZodObject<{
    brandId: z.ZodString;
    categoryId: z.ZodString;
    brand: z.ZodString;
    status: z.ZodEnum<{
        DELETED: "DELETED";
        ENABLED: "ENABLED";
        DISABLED: "DISABLED";
    }>;
}, z.core.$strip>;
/** Note: Validate Get Brand By Category. */
export declare const VALIDATE_GET_BRAND_BY_CATEGORY: z.ZodObject<{
    categoryId: z.ZodString;
}, z.core.$strip>;
/** Note: Validate Delete Size Document. */
export declare const VALIDATE_DELETE_BRAND_DOCUMENT: z.ZodObject<{
    brandId: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=brand.validater.d.ts.map