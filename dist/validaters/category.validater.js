import * as z from "zod";
import { CATEGORY_STATUS } from "../interfaces/category.interfaces.js";
/** Note: Validate Create Category. */
export const VALIDATE_CREATE_CATEGORY = z.object({
    parent: z.string().min(24, "Error: Object id at least 24 character").optional().nullable(),
    title: z.string(),
    image: z.string().nullable().optional(),
    status: z.enum(CATEGORY_STATUS),
});
/** Note: Validate Update Category. */
export const VALIDATE_UPDATE_CATEGORY = z.object({
    categoryId: z.string().min(24, "Error: Object id at least 24 character"),
    parent: z.string().min(24, "Error: Object id at least 24 character").optional().nullable(),
    title: z.string(),
    image: z.string().nullable().optional(),
    status: z.enum(CATEGORY_STATUS),
});
/** Note: Validate Delete Category. */
export const VALIDATE_DELETE_CATEGORY = z.object({
    categoryId: z.string().min(24, "Error: Object id at least 24 character")
});
//# sourceMappingURL=category.validater.js.map