import type { Types, Document } from "mongoose";
export declare const PRODUCT_SORT: readonly ["PRICE_HIGH_TO_LOW", "PRICE_LOW_TO_HIGH", "NEWEST_FIRST", "RELEVANCE"];
export type ProductSort = typeof PRODUCT_SORT[number];
export declare const PRODUCT_CONDITION: readonly ["NEW_WITH_TAGS", "NEW_WITHOUT_TAGS", "VERY_GOOD", "GOOD", "SATISFACTORY"];
export type ProductCondition = typeof PRODUCT_CONDITION[number];
/** Note: Product Material array */
export declare const PRODUCT_MATERIAL: readonly ["ACRYLIC", "ALPACA", "BAMBOO", "CANVAS", "CARDBOARD", "CASHMERE", "CERAMIC", "CHIFFON", "CORDUROY", "COTTON", "DENIM", "DOWN", "ELASTANE", "FAUX_FUR", "FAUX_LEATHER", "FELT", "FLANNEL", "FLEECE", "FOAM", "GLASS", "GOLD", "JUTE", "LACE", "LATEX", "LEATHER", "LINEN", "MERINO", "MESH", "METAL", "MOHAIR", "NEOPRENE", "NYLON", "PAPER", "PATENT_LEATHER", "PLASTIC", "POLYESTER", "PORCELAIN", "RATTAN", "RAYON", "RUBBER", "SATIN", "SEQUIN", "SILICONE", "SILK", "SILVER", "STEEL", "STONE", "STRAW", "SUEDE", "TULLE", "TWEED", "VELOUR", "VELVET", "WOOD", "WOOL"];
export type ProductMaterial = typeof PRODUCT_MATERIAL[number];
export declare const PRODUCT_MATERIAL_ENUM: readonly string[];
/** Note: Product Color array */
export declare const PRODUCT_COLOR: readonly ["BLACK", "WHITE", "GREY", "BROWN", "BEIGE", "RED", "MAROON", "PINK", "PURPLE", "ORANGE", "YELLOW", "BLUE", "NAVY", "TEAL", "GREEN", "OLIVE", "GOLD", "SILVER", "MULTICOLOR"];
export type ProductColor = typeof PRODUCT_COLOR[number];
/** Note: Product Parcel size array */
export declare const PRODUCT_PARCEL_SIZE: readonly ["SMALL", "MEDIUM", "LARGE"];
export type ProductParcelSize = typeof PRODUCT_PARCEL_SIZE[number];
/** Note: Product Status array */
export declare const PRODUCT_STATUS: readonly ["DRAFT", "PUBLISHED", "DELETED", "SOLD"];
export type ProductStatus = typeof PRODUCT_STATUS[number];
export interface ProductInterface {
    categoryId: Types.ObjectId;
    owner: Types.ObjectId;
    title: string;
    description: string;
    condition: ProductCondition;
    brand: Types.ObjectId;
    coverImage: string;
    colors: ProductColor[];
    material: ProductMaterial;
    parcelSize: ProductParcelSize;
    size: Types.ObjectId;
    price: number;
    status: ProductStatus;
}
export interface ProductDocument extends ProductInterface, Document {
}
/** @type Create product Interface */
export interface CreateProductInterface {
    categoryId: string;
    owner: string;
    title: string;
    description: string;
    condition: ProductCondition;
    brand: string;
    coverImage: string;
    colors: ProductColor[];
    material: ProductMaterial[];
    parcelSize: ProductParcelSize;
    size: string;
    price: number;
    status: ProductStatus;
}
export interface SearchProductInterface {
    userId?: string | null | undefined;
    q?: string | null | undefined;
    categoryId?: string | null | undefined;
    price?: {
        min?: number | null | undefined;
        max?: number | null | undefined;
    } | undefined;
    materials?: ProductMaterial[] | null | undefined;
    conditions?: ProductCondition[] | null | undefined;
    brands?: string[] | null | undefined;
    sizes?: string[] | null | undefined;
    page: number;
    limit: number;
}
export interface UpdateProductInterface {
    productId: string;
    categoryId: string;
    title: string;
    description: string;
    condition: ProductCondition;
    brand: string;
    coverImage: string;
    colors: ProductColor[];
    materials: ProductMaterial[];
    parcelSize: ProductParcelSize;
    size: string;
    price: number;
    status: ProductStatus;
}
export interface FeaturedProductsInterface {
    userId?: string;
    page?: number | null | undefined;
    limit?: number;
    categoryId?: string | null | undefined;
    price?: {
        min?: number | null | undefined;
        max?: number | null | undefined;
    } | undefined;
    sizes?: string[] | null | undefined;
    sort?: ProductSort | null | undefined;
}
export interface GetSingleProductInterface {
    productId: string;
    userId?: string;
}
//# sourceMappingURL=product.interfaces.d.ts.map