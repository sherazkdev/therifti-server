/** Status Code */
export const STATUS_CODES = {
    // 1xx – Informational
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    // 2xx – Success
    OK: 200, // Request successful
    CREATED: 201, // Resource created
    ACCEPTED: 202,
    NO_CONTENT: 204, // Success but no response body
    // 3xx – Redirection
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    NOT_MODIFIED: 304,
    // 4xx – Client Errors
    BAD_REQUEST: 400, // Validation error
    UNAUTHORIZED: 401, // Token missing / invalid
    FORBIDDEN: 403, // No permission
    NOT_FOUND: 404, // Resource not found
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409, // Duplicate data
    UNPROCESSABLE_ENTITY: 422, // Form / input error
    TOO_MANY_REQUESTS: 429, // Rate limit
    // 5xx – Server Errors
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504
};
/** Note: Success message for response sending. */
export const SUCCESS_MESSAGES = {
    AUTH: {
        REGISTER: "Account created successfully",
        LOGIN: "Login successful",
        LOGOUT: "Logout successful",
        TOKEN_REFRESH: "Token refreshed successfully"
    },
    USER: {
        FETCH: "User fetched successfully",
        UPDATE: "User profile updated successfully",
        OTP_SUCCESSFULLY_SENDED: "Otp successfully submit",
        DELETE: "User deleted successfully"
    },
    PRODUCT: {
        CREATE: "Product created successfully",
        UPDATE: "Product updated successfully",
        DELETE: "Product deleted successfully",
        FETCH: "Product fetched successfully",
        SOLD: "Product marked as sold",
        RESERVED: "Product reserved successfully"
    },
    CATEGORY: {
        FETCH: "Categories fetched successfully"
    },
    ORDER: {
        CREATE: "Order placed successfully",
        FETCH: "Order fetched successfully",
        CANCEL: "Order cancelled successfully"
    },
    PAYMENT: {
        SUCCESS: "Payment completed successfully",
        REFUND: "Refund processed successfully"
    },
    SHIPPING: {
        FETCH: "Shipping options fetched successfully"
    },
    CHAT: {
        MESSAGE_SENT: "Message sent successfully",
        CHAT_CREATED: "Chat created successfully"
    },
    PROMOTION: {
        BUMP_CREATED: "Product promotion activated successfully",
        BUMP_EXPIRED: "Product promotion expired"
    },
    BUNDLE: {
        CREATED: "Bundle created successfully"
    },
    DONATION: {
        SUCCESS: "Donation completed successfully",
        SUBSCRIPTION_STARTED: "Donation subscription started",
        SUBSCRIPTION_CANCELLED: "Donation subscription cancelled"
    },
    ADMIN: {
        ACTION_SUCCESS: "Admin action completed successfully"
    }
};
/** Note: Error message for error throwing. */
export const ERROR_MESSAGES = {
    COMMON: {
        SOMETHING_WENT_WRONG: "Something went wrong",
        UNAUTHORIZED: "Unauthorized access",
        FORBIDDEN: "You do not have permission to perform this action",
        NOT_FOUND: "Resource not found",
        INVALID_ID: "Invalid ID provided"
    },
    AUTH: {
        EMAIL_EXISTS: "Email already exists",
        INVALID_CREDENTIALS: "Invalid email or password",
        USERNAME_EXISTS: "Username already exist",
        TOKEN_EXPIRED: "Token has expired",
        REFRESH_TOKEN_NOT_FOUND: "Refresh token is not found",
        OTP_NOT_FOUND: "Otp not found",
        INVALID_OTP: "Invalid otp",
        EMAIL_NOT_FOUND: "Email not found",
        TOKEN_NOT_FOUND: "Token not found",
        TOKEN_IS_USED: "Token is used already",
        OTP_EXPIRED: "Otp Expired",
        ACCESS_TOKEN_NOT_FOUND: "Access token is not found",
        TOKEN_INVALID: "Invalid authentication token"
    },
    USER: {
        NOT_FOUND: "User not found",
        UPDATE_FAILED: "Failed to update user profile",
        USERID_OR_EMAIL_IS_REQUIRED: "userId or email is required",
        ACCOUNT_DEACTIVATE_LIVE_PRODUCTS: "You can’t deactivate your fucking account while your products are still live. Remove them first."
    },
    EMAIL: {
        EMAIL_TEMPLATE_NOT_FOUND: "Email template not found"
    },
    PRODUCT: {
        NOT_FOUND: "Product not found",
        CREATE_FAILED: "Failed to create product",
        UPDATE_FAILED: "Failed to update product",
        DELETE_FAILED: "Failed to delete product",
        ALREADY_SOLD: "Product is already sold",
        NOT_OWNER: "You are not the owner of this product"
    },
    CATEGORY: {
        NOT_FOUND: "Category not found"
    },
    ORDER: {
        NOT_FOUND: "Order not found",
        CREATE_FAILED: "Failed to place order",
        INVALID_STATUS: "Invalid order status"
    },
    PAYMENT: {
        FAILED: "Payment failed",
        INVALID_METHOD: "Invalid payment method",
        ALREADY_PAID: "Order already paid"
    },
    SHIPPING: {
        NOT_AVAILABLE: "Shipping option not available"
    },
    CHAT: {
        CHAT_NOT_FOUND: "Chat not found",
        MESSAGE_FAILED: "Failed to send message"
    },
    PROMOTION: {
        ALREADY_ACTIVE: "Promotion already active for this product",
        PAYMENT_REQUIRED: "Payment required to activate promotion"
    },
    BUNDLE: {
        INVALID_ITEMS: "Invalid items selected for bundle"
    },
    DONATION: {
        FAILED: "Donation failed",
        INVALID_AMOUNT: "Invalid donation amount"
    },
    ADMIN: {
        ACTION_FAILED: "Admin action failed"
    }
};
//# sourceMappingURL=responseConstants.js.map