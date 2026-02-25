/** Interfaces */
import type { BrandDocument, CreateBrandInterface } from "../interfaces/brand.interfaces.js";
declare class BrandServices {
    /**
     * Note: Create Brand For Product.
     * @param {object} brandObject - Object containing fields to update.
     * @param {string} [brandObject.categoryId] - Category reference ID.
     * @param {string} [brandObject.brand] - Brand name.
     * @param {string} [brandObject.status] - Brand visibility status.
     *
     * @throws {ApiError} If brand already brand name is unique.
     * @returns {BrandDocument} Newly brand document
    */
    CreateBrand(brandObject: CreateBrandInterface): Promise<BrandDocument>;
    /**
     * Note: Get Brand By Category.
     * @param {string} categoryId - Brand Identifier.
     * @returns {Promise<BrandDocument[]>} return matched documents.
    */
    GetBrandByCategory(categoryId: string): Promise<BrandDocument[]>;
}
export default BrandServices;
//# sourceMappingURL=brand.services.d.ts.map