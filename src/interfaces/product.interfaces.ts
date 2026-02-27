import type {Types,Document} from "mongoose";
export const PRODUCT_SORT = [
  "PRICE_HIGH_TO_LOW",
  "PRICE_LOW_TO_HIGH",
  "NEWEST_FIRST",
  "RELEVANCE",
] as const;

export type ProductSort = typeof PRODUCT_SORT[number];

export const PRODUCT_CONDITION = ["NEW_WITH_TAGS","NEW_WITHOUT_TAGS","VERY_GOOD","GOOD","SATISFACTORY"] as const;
export type ProductCondition = typeof PRODUCT_CONDITION[number];

/** Note: Product Color array */
export const PRODUCT_COLOR = [
  "BLACK",
  "WHITE",
  "GREY",
  "BROWN",
  "BEIGE",

  "RED",
  "MAROON",
  "PINK",
  "PURPLE",
  "ORANGE",
  "YELLOW",

  "BLUE",
  "NAVY",
  "TEAL",
  "GREEN",
  "OLIVE",

  "GOLD",
  "SILVER",

  "MULTICOLOR"
] as const;
export type ProductColor = typeof PRODUCT_COLOR[number];

/** Note: Product Parcel size array */
export const PRODUCT_PARCEL_SIZE = [
  "SMALL",
  "MEDIUM",
  "LARGE"
] as const;
export type ProductParcelSize = typeof PRODUCT_PARCEL_SIZE[number];

/** Note: Product Status array */
export const PRODUCT_STATUS = [
  "DRAFT",
  "PUBLISHED",
  "DELETED",
  "SOLD"
] as const;
export type ProductStatus = typeof PRODUCT_STATUS[number];

export interface ProductInterface {
    categoryId:Types.ObjectId,
    owner:Types.ObjectId,
    title:string,
    description:string,
    condition:ProductCondition,
    brand:Types.ObjectId,
    coverImage:string,
    colors:ProductColor[],
    materials:Types.ObjectId[],
    parcelSize:ProductParcelSize,
    size:Types.ObjectId,
    price:number,
    status:ProductStatus,
};

export interface ProductDocument extends ProductInterface, Document {};

/** @type Create product Interface */
export interface CreateProductInterface {
  categoryId:string,
  owner:string,
  title:string,
  description:string,
  condition:ProductCondition,
  brand:string,
  coverImage:string,
  colors:ProductColor[],
  materials:string[],
  parcelSize:ProductParcelSize,
  size:string,
  price:number,
  status:ProductStatus
}

export interface SearchProductInterface {
  userId?:string | null | undefined,
  q?:string | null | undefined,
  categoryId?:string | null | undefined,
  price?:{
    min?:number | null | undefined,
    max?:number | null | undefined
  } | undefined,
  materials?:string[] | null | undefined,
  conditions?:ProductCondition[] | null | undefined,
  brands?:string[] | null | undefined,
  sizes?:string[] | null | undefined,
  page:number,
  limit:number
}

export interface UpdateProductInterface {
  productId:string,
  categoryId:string,
  title:string,
  description:string,
  condition:ProductCondition,
  brand:string,
  coverImage:string,
  colors:ProductColor[],
  materials:string[],
  parcelSize:ProductParcelSize,
  size:string,
  price:number,
  status:ProductStatus
}

export interface FeaturedProductsInterface {
  userId?:string,
  page?:number | null | undefined,
  limit?:number,
  categoryId?:string | null | undefined,
  price?:{
    min?:number | null | undefined,
    max?:number | null | undefined
  } | undefined,
  sizes?:string[] | null | undefined,
  sort?:ProductSort | null | undefined
}

export interface GetSingleProductInterface {
  productId:string,
  userId?:string
}