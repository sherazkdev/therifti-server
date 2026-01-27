import type {Types,Document} from "mongoose";

/** Note: Address Interface */
export interface AddressInterface {
    userId:Types.ObjectId,
    country?:string | null,
    city?:string | null,
    streetAddress?:string | null,
    area?:string | null,
    postalCode: number,
    isDefault:Boolean
}
/** Note: Address Document */
export interface AddressDocument extends AddressInterface, Document {};
