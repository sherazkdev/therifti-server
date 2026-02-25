/** Interfaces */
import type { CreateSizeInterface, SizeDocument, UpdateSizeInterface } from "../interfaces/size.interfaces.js";
declare class SizeServices {
    /**
     * Note: Create Size.
     * @param {string} categoryId - CategoryId reference.
     * @param {string} international - international size is required.
     * @param {string} US - Us size | Optional.
     * @param {string} UK - UK size | Optionl.
     * @param {String} EU - EU size | Optional.
     * @param {string} waist - waist is Optional.
     * @throws {ApiError} if size already exist throw error.
     * @returns {UserDocument}.
    */
    CreateSize(sizeDetails: CreateSizeInterface): Promise<SizeDocument>;
    /**
     * Note: Find Size by Id.
     * @param {string} sizeId - sizeId of the SizeDocument.
     * @throws {ApiError} if sizeDocument not exist.
     * @returns {Promise<SizeDocument>} finded sizeDocument.
    */
    FindSizeById(sizeId: string): Promise<SizeDocument>;
    /**
     * Updates an existing Size document.
     *
     * @param {UpdateSizeInterface} updateSizeObject - Object containing fields to update.
     * @param {string} updateSizeObject.sizeId - Unique identifier of the Size document.
     * @param {string} [updateSizeObject.categoryId] - Category reference ID.
     * @param {string} [updateSizeObject.international] - International size standard.
     * @param {string} [updateSizeObject.UK] - UK size standard.
     * @param {string} [updateSizeObject.EU] - EU size standard.
     * @param {string} [updateSizeObject.US] - US size standard.
     * @param {string} [updateSizeObject.waist] - Waist measurement.
     *
     * @returns {Promise<SizeDocument>} Updated Size document.
     *
     * @throws {ApiError} If the Size document does not exist.
    */
    UpdateSize(updateSizeObject: UpdateSizeInterface): Promise<SizeDocument>;
    /**
     * Note: Delete Size Document.
     * @param {string} sizeId - Unique identifier of the Size document.
     *
     * @returns {Promise<boolean>} If size Document return boolean.
     * @throws {ApiError} If size Document does not exist.
    */
    DeleteSize(sizeId: string): Promise<boolean>;
    /**
     * Note: Find Category sizes Document.
     * @param {string} categoryId - Size Document Indentifier.
     * @returns {Promise<SizeDocument[]>} Matched By categoryId size documents.
    */
    GetSizedsByCategory(categoryId: string): Promise<SizeDocument[]>;
}
export default SizeServices;
//# sourceMappingURL=size.services.d.ts.map