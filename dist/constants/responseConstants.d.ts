/** Status Code */
export declare const STATUS_CODES: {
    CONTINUE: number;
    SWITCHING_PROTOCOLS: number;
    OK: number;
    CREATED: number;
    ACCEPTED: number;
    NO_CONTENT: number;
    MOVED_PERMANENTLY: number;
    FOUND: number;
    NOT_MODIFIED: number;
    BAD_REQUEST: number;
    UNAUTHORIZED: number;
    FORBIDDEN: number;
    NOT_FOUND: number;
    METHOD_NOT_ALLOWED: number;
    CONFLICT: number;
    UNPROCESSABLE_ENTITY: number;
    TOO_MANY_REQUESTS: number;
    INTERNAL_SERVER_ERROR: number;
    NOT_IMPLEMENTED: number;
    BAD_GATEWAY: number;
    SERVICE_UNAVAILABLE: number;
    GATEWAY_TIMEOUT: number;
};
/** Note: Success message for response sending. */
export declare const SUCCESS_MESSAGES: {
    AUTH: {
        REGISTER: string;
        LOGIN: string;
        LOGOUT: string;
        TOKEN_REFRESH: string;
    };
    USER: {
        FETCH: string;
        UPDATE: string;
        OTP_SUCCESSFULLY_SENDED: string;
        DELETE: string;
    };
    PRODUCT: {
        CREATE: string;
        UPDATE: string;
        DELETE: string;
        FETCH: string;
        SOLD: string;
        RESERVED: string;
    };
    CATEGORY: {
        FETCH: string;
    };
    ORDER: {
        CREATE: string;
        FETCH: string;
        CANCEL: string;
    };
    PAYMENT: {
        SUCCESS: string;
        REFUND: string;
    };
    SHIPPING: {
        FETCH: string;
    };
    CHAT: {
        MESSAGE_SENT: string;
        CHAT_CREATED: string;
    };
    PROMOTION: {
        BUMP_CREATED: string;
        BUMP_EXPIRED: string;
    };
    BUNDLE: {
        CREATED: string;
    };
    REVIEW: {
        REVIEWS_FETCHED: string;
    };
    DONATION: {
        SUCCESS: string;
        SUBSCRIPTION_STARTED: string;
        SUBSCRIPTION_CANCELLED: string;
    };
    ADMIN: {
        ACTION_SUCCESS: string;
    };
};
/** Note: Error message for error throwing. */
export declare const ERROR_MESSAGES: {
    COMMON: {
        SOMETHING_WENT_WRONG: string;
        UNAUTHORIZED: string;
        FORBIDDEN: string;
        NOT_FOUND: string;
        INVALID_ID: string;
    };
    AUTH: {
        EMAIL_EXISTS: string;
        INVALID_CREDENTIALS: string;
        USERNAME_EXISTS: string;
        TOKEN_EXPIRED: string;
        REFRESH_TOKEN_NOT_FOUND: string;
        OTP_NOT_FOUND: string;
        INVALID_OTP: string;
        EMAIL_NOT_FOUND: string;
        TOKEN_NOT_FOUND: string;
        TOKEN_IS_USED: string;
        OTP_EXPIRED: string;
        ACCESS_TOKEN_NOT_FOUND: string;
        TOKEN_INVALID: string;
    };
    USER: {
        NOT_FOUND: string;
        UPDATE_FAILED: string;
        USERID_OR_EMAIL_IS_REQUIRED: string;
        ACCOUNT_DEACTIVATE_LIVE_PRODUCTS: string;
    };
    EMAIL: {
        EMAIL_TEMPLATE_NOT_FOUND: string;
    };
    PRODUCT: {
        NOT_FOUND: string;
        CREATE_FAILED: string;
        UPDATE_FAILED: string;
        DELETE_FAILED: string;
        ALREADY_SOLD: string;
        NOT_OWNER: string;
    };
    CATEGORY: {
        NOT_FOUND: string;
    };
    ORDER: {
        NOT_FOUND: string;
        CREATE_FAILED: string;
        INVALID_STATUS: string;
    };
    PAYMENT: {
        FAILED: string;
        INVALID_METHOD: string;
        ALREADY_PAID: string;
    };
    SHIPPING: {
        NOT_AVAILABLE: string;
    };
    CHAT: {
        CHAT_NOT_FOUND: string;
        MESSAGE_FAILED: string;
    };
    PROMOTION: {
        ALREADY_ACTIVE: string;
        PAYMENT_REQUIRED: string;
    };
    BUNDLE: {
        INVALID_ITEMS: string;
    };
    DONATION: {
        FAILED: string;
        INVALID_AMOUNT: string;
    };
    ADMIN: {
        ACTION_FAILED: string;
    };
};
//# sourceMappingURL=responseConstants.d.ts.map