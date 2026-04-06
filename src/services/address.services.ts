import AddressModel from "../models/address.model.js";
import mongoose from "mongoose";

/** Response Constants */
import {ERROR_CODES, ERROR_MESSAGES, STATUS_CODES} from "../constants/responseConstants.js";
import ApiError from "../utils/ApiError.js";
import type { AddressDocument, CreateAddressInterface, GetAddressInterface, UpdateAddressInterface } from "../interfaces/address.interfaces.js";

class AddressServices {

    public async CreateAddress(addressObj:CreateAddressInterface):Promise<void>{
        const {
            userId,
            area,
            city,
            country,
            postalCode,
            streetAddress
        } = addressObj;
    
        const addressDocument = await AddressModel.create({
            userId: new mongoose.Types.ObjectId(userId),
            area: area && area || null,
            city: city && city || null,
            country: country && country || null,
            postalCode: postalCode && postalCode || null,
            streetAddress: streetAddress && streetAddress || null
        });
        return;
    };

    public async GetAddress(addressObj:GetAddressInterface):Promise<AddressDocument>{
        const {addressId,userId} = addressObj;
        if( (!addressId || !userId)) throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_CODES.COMMON.NOT_FOUND);
        const addressDocument = await AddressModel.findOne({
            $or : [
                { _id: new mongoose.Types.ObjectId(addressId)},
                { userId: new mongoose.Types.ObjectId(userId)},
            ]
        });
        if(!addressDocument) throw new ApiError(STATUS_CODES.UNAUTHORIZED,ERROR_CODES.ADDRESS.NOT_FOUND);
        return addressDocument;
    };
    
    public async UpdateAddress(addressObj:UpdateAddressInterface):Promise<void>{
        const {userId,area,city,country,postalCode,streetAddress} = addressObj;
        const addressDocument = await AddressModel.findOne(new mongoose.Types.ObjectId(userId));
        /** Note: Check If address Document is exist. */
        if(!addressDocument) throw new ApiError(STATUS_CODES.UNAUTHORIZED,ERROR_CODES.ADDRESS.NOT_FOUND);
        addressDocument.area = area;
        addressDocument.streetAddress = streetAddress;
        addressDocument.city = city;
        addressDocument.country = country;
        if(postalCode) 
            addressDocument.postalCode = postalCode;
    
        await addressDocument.save();
        return;
    };
    
};

export default AddressServices;