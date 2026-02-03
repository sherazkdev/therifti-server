import type { Types, Document } from "mongoose";
/** Media FileTypes */
export declare enum MediaFileTypes {
    PDF = ".pdf",
    JPG = ".jpg",
    JPEG = ".jpeg",
    WEBP = ".webp",
    PNG = ".png"
}
/** Media Interface */
export interface MediaInterface {
    productId: Types.ObjectId;
    mediaUrl: string;
    fileType: MediaFileTypes;
}
/** Media Document with types */
export interface MediaDocument extends MediaInterface, Document {
}
//# sourceMappingURL=media.interfaces.d.ts.map