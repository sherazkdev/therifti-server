import * as z from "zod";
/** Note: Validate Create Category. */
export declare const VALIDATE_CREATE_CATEGORY: z.ZodObject<{
    parent: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    title: z.ZodString;
    image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodEnum<{
        ENABLED: "ENABLED";
        DISABLED: "DISABLED";
    }>;
}, z.core.$strip>;
/** Note: Validate Update Category. */
export declare const VALIDATE_UPDATE_CATEGORY: z.ZodObject<{
    categoryId: z.ZodString;
    parent: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    title: z.ZodString;
    image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodEnum<{
        ENABLED: "ENABLED";
        DISABLED: "DISABLED";
    }>;
}, z.core.$strip>;
/** Note: Validate Delete Category. */
export declare const VALIDATE_DELETE_CATEGORY: z.ZodObject<{
    categoryId: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=category.validater.d.ts.map