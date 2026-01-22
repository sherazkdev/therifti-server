import * as z from "zod";

/** Note: Validate Register User Account. */
export const VALIDATE_REGISTER_USER_ACCOUNT = z.object({
    email: z.email(),
    fullname: z.string().length(3,"Error: fullname at least 3 character"),
    username: z.string().length(3,"Error: username at least 3 character"),
    password: z.string().length(8,"Error: password at least 9 character"),
    zipCode: z.string().optional()
});

/** Note: Validate Login User Account. */
export const VALIDATE_LOGIN_USER_ACCOUNT = z.object({
    email: z.email(),
    password: z.string().length(8,"Error: password at least 9 character")
});

/** Note: Validate Get User Profile */
export const VALIDATE_GET_USER_PROFILE = z.object({
    userId: z.string().length(24,"Error: Object id at least 24 character"),
    page: z.number().optional(),
    limit: z.number().optional()
});

/** Note: Validate Update User Profile */
export const VALIDATE_UPDATE_USER_PROFILE = z.object({
    about: z.string().optional(),
    avatar: z.string().optional(),
    fullname: z.string().optional(),
    dob : z.date().optional(),
    username: z.string().optional(),
    location: {
        city: z.string().optional(),
        country: z.string().optional()
    },
    gender:z.string().optional()
})

/** Note: Validate Verify Otp */
