import type { Document } from "mongoose";
export interface UserInterface {
    googleId?: string | null;
    facebookeId?: string | null;
    appleId?: string | null;
    fullname?: string | null;
    email: string | null;
    avatar?: string | null;
    password?: string | null;
    phoneNumber?: {
        countryCode: string | null;
        nationalNumber: string | null;
    };
    location?: {
        city: string | null;
        country: string | null;
    };
    refreshToken?: string | null;
    lastSeen?: Date;
}
export interface UserDocument extends UserInterface, Document {
}
//# sourceMappingURL=user.interfaces.d.ts.map