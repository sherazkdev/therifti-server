import type {Types,Document} from "mongoose";

/** Note: Address Interface */
export interface AddressInterface {
    userId:Types.ObjectId,
    country?:string | null,
    city?:string | null,
    streetAddress?:string | null,
    area?:string | null,
    postalCode: number | null,
    isDefault:Boolean
};

/** Note: Create Address */
export interface CreateAddressInterface {
    userId:string,
    country?:string | null,
    city?:string | null,
    streetAddress?:string | null,
    area?:string | null,
    postalCode?: number | null,
};

/** Note: Update Address */
export interface UpdateAddressInterface {
    userId:string,    
    country:string | null,
    city:string | null,
    streetAddress:string | null,
    area:string | null,
    postalCode?: number | null,
};

/** Note: Get Address */
export interface GetAddressInterface {
    addressId:string,
    userId:string
};

/** Note: Address Document */
export interface AddressDocument extends AddressInterface, Document {};