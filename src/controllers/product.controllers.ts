/** Response Constants */
import {ERROR_MESSAGES, STATUS_CODES} from "../constants/responseConstants.js";
import ApiError from "../utils/ApiError.js";

/** Note: Product Services */
import ProductServices from "../services/product.services.js";

class ProductControllers {
    private productServices = new ProductServices();

}

export default ProductControllers;