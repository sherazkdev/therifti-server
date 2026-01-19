import zod from "zod";

/** Get Category Products Validate */
export const GET_CATEGORY_PRODUCTS_VALIDATE = zod.object({
    categoryId: zod.string().length(24, "Error: categoryId must be a valid 24 character ObjectId"),
    page: zod.number(),
    limit:zod.number(),
});