import mongoose from "mongoose"



export const Categories = [
    { "_id": "641a2b3c4d5e6f7a8b9c0001", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": null, "title": "Fashion", "icon": "GiClothes", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c0002", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": null, "title": "Electronics", "icon": "MdDevices", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c0003", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": null, "title": "Home & Living", "icon": "MdHome", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c0004", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": null, "title": "Groceries", "icon": "MdShoppingBasket", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c0005", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": null, "title": "Beauty & Care", "icon": "MdHealthAndSafety", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c0006", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": null, "title": "Sports", "icon": "MdSportsBasketball", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c0007", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": null, "title": "Automotive", "icon": "MdDirectionsCar", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c0008", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": null, "title": "Toys & Kids", "icon": "MdToys", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c0009", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": null, "title": "Books & Stationery", "icon": "MdBook", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c0010", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": null, "title": "Pet Supplies", "icon": "MdPets", "status": "ENABLED" },

    { "_id": "641a2b3c4d5e6f7a8b9c1001", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0001", "title": "Men's Clothing", "icon": "ImMan", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1002", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0001", "title": "Women's Clothing", "icon": "ImWoman", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1003", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0001", "title": "Footwear", "icon": "GiRunningShoe", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1004", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0001", "title": "Watches & Accessories", "icon": "MdWatch", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1005", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0001", "title": "Jewelry", "icon": "GiDiamondRing", "status": "ENABLED" },
  
    // --- 10 Sub Categories for Men's Clothing (m_1001) ---
    { "_id": "641a2b3c4d5e6f7a8b9c2001", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1001", "title": "T-Shirts", "icon": "GiTShirt", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2002", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1001", "title": "Casual Shirts", "icon": "MdOutlineCheckroom", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2003", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1001", "title": "Formal Shirts", "icon": "GiShirt", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2004", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1001", "title": "Jeans", "icon": "GiTrousers", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2005", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1001", "title": "Chinos", "icon": "GiArmoredPants", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2006", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1001", "title": "Jackets", "icon": "GiHoodie", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2007", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1001", "title": "Hoodies", "icon": "GiSleevelessJacket", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2008", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1001", "title": "Suits", "icon": "GiSuitcase", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2009", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1001", "title": "Activewear", "icon": "MdDirectionsRun", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2010", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1001", "title": "Ethnic Wear", "icon": "GiTurban", "status": "ENABLED" },
  
    /* ==========================================
       3. ELECTRONICS TREE (1owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"),  Parent -> 5 Main -> 10 Sub for first Main)
       ========================================== */
    // --- 5 Main Categories for Electronics ---
    { "_id": "641a2b3c4d5e6f7a8b9c1101", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0002", "title": "Mobiles & Tablets", "icon": "MdSmartphone", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1102", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0002", "title": "Laptops & Computers", "icon": "MdLaptop", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1103", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0002", "title": "TV & Home Appliances", "icon": "MdTv", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1104", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0002", "title": "Audio & Headphones", "icon": "MdHeadset", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1105", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0002", "title": "Cameras", "icon": "MdCameraAlt", "status": "ENABLED" },
  
    // --- 10 Sub Categories for Mobiles (m_1101) ---
    { "_id": "641a2b3c4d5e6f7a8b9c2101", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1101", "title": "Smartphones", "icon": "MdPhonelinkRing", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2102", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1101", "title": "iPhones", "icon": "AiFillApple", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2103", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1101", "title": "Android Tablets", "icon": "MdTabletAndroid", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2104", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1101", "title": "Feature Phones", "icon": "MdPhoneAndroid", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2105", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1101", "title": "Power Banks", "icon": "MdBatteryChargingFull", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2106", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1101", "title": "Phone Cases", "icon": "MdLayers", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2107", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1101", "title": "Charging Cables", "icon": "MdUsb", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2108", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1101", "title": "Screen Protectors", "icon": "MdDesktopAccessDisabled", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2109", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1101", "title": "Selfie Sticks", "icon": "MdCamera", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2110", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1101", "title": "Memory Cards", "icon": "MdSdStorage", "status": "ENABLED" },
  
    /* ==========================================
       4. HOME & LIVING TREE (1owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"),  Parent -> 5 Main -> 10 Sub for first Main)
       ========================================== */
    // --- 5 Main Categories for Home ---
    { "_id": "641a2b3c4d5e6f7a8b9c1201", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0003", "title": "Furniture", "icon": "GiChair", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1202", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0003", "title": "Kitchenware", "icon": "MdRestaurant", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1203", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0003", "title": "Home Decor", "icon": "MdOutlineBrush", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1204", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0003", "title": "Bedding", "icon": "MdBed", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1205", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0003", "title": "Lighting", "icon": "MdLightbulb", "status": "ENABLED" },
  
    // --- 10 Sub Categories for Furniture (m_1201) ---
    { "_id": "641a2b3c4d5e6f7a8b9c2201", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1201", "title": "Sofas", "icon": "GiSofa", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2202", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1201", "title": "Coffee Tables", "icon": "MdTableBar", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2203", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1201", "title": "Beds", "icon": "MdSingleBed", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2204", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1201", "title": "Wardrobes", "icon": "MdDoorSliding", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2205", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1201", "title": "Office Chairs", "icon": "MdChair", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2206", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1201", "title": "Dining Tables", "icon": "MdTableRestaurant", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2207", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1201", "title": "Bookshelves", "icon": "MdMenuBook", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2208", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1201", "title": "Shoe Racks", "icon": "GiRunningShoe", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2209", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1201", "title": "TV Units", "icon": "MdTv", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2210", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1201", "title": "Outdoor Furniture", "icon": "MdDeck", "status": "ENABLED" },
  
    /* ==========================================
       4. GROCERIES owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), (Parent: ...0004)
       ========================================== */

    { "_id": "641a2b3c4d5e6f7a8b9c1301", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0004", "title": "Fresh Produce", "icon": "GiFruitBowl", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1302", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0004", "title": "Dairy & Eggs", "icon": "GiEggClutch", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1303", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0004", "title": "Beverages", "icon": "MdOutlineLocalDrink", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1304", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0004", "title": "Frozen Foods", "icon": "MdIcecream", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1305", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0004", "title": "Snacks & Confectionery", "icon": "GiCandyCanes", "status": "ENABLED" },
  
    // Sub-Categories for Fresh Produce (m_1301)
    { "_id": "641a2b3c4d5e6f7a8b9c2301", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1301", "title": "Fresh Vegetables", "icon": "GiCarrot", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2302", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1301", "title": "Fresh Fruits", "icon": "GiAppleMagical", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2303", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1301", "title": "Organic Produce", "icon": "MdLeaf", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2304", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1301", "title": "Herbs & Seasoning", "icon": "GiSprout", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2305", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1301", "title": "Root Vegetables", "icon": "GiPotato", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2306", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1301", "title": "Leafy Greens", "icon": "GiCabbage", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2307", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1301", "title": "Citrus Fruits", "icon": "GiLemon", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2308", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1301", "title": "Berries", "icon": "GiStrawberry", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2309", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1301", "title": "Exotic Fruits", "icon": "GiPineapple", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2310", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1301", "title": "Pre-cut Salads", "icon": "GiBowlOfFood", "status": "ENABLED" },
  
    /* ==========================================
       5. BEAUTY & CARE owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), (Parent: ...0005)
       ========================================== */
    { "_id": "641a2b3c4d5e6f7a8b9c1401", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0005", "title": "Skincare", "icon": "MdFace", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1402", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0005", "title": "Haircare", "icon": "GiComb", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1403", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0005", "title": "Makeup", "icon": "GiLipstick", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1404", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0005", "title": "Fragrances", "icon": "GiPerfumeBottle", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1405", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0005", "title": "Personal Care", "icon": "MdCleanHands", "status": "ENABLED" },
  
    // Sub-Categories for Skincare (m_1401)
    { "_id": "641a2b3c4d5e6f7a8b9c2401", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1401", "title": "Face Wash", "icon": "MdOutlineWaterDrop", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2402", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1401", "title": "Moisturizers", "icon": "MdOpacity", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2403", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1401", "title": "Sunscreen", "icon": "MdWbSunny", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2404", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1401", "title": "Serums", "icon": "MdScience", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2405", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1401", "title": "Face Masks", "icon": "GiSurgicalMask", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2406", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1401", "title": "Eye Care", "icon": "MdVisibility", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2407", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1401", "title": "Lip Care", "icon": "GiLips", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2408", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1401", "title": "Body Lotions", "icon": "MdDryCleaning", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2409", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1401", "title": "Anti-Aging", "icon": "MdAutoFixHigh", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2410", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1401", "title": "Toners", "icon": "MdInvertColors", "status": "ENABLED" },
  
    /* ==========================================
       6. SPORTS owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), (Parent: ...0006)
       ========================================== */
    { "_id": "641a2b3c4d5e6f7a8b9c1501", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0006", "title": "Fitness & Gym", "icon": "GiWeightLiftingUp", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1502", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0006", "title": "Outdoor Sports", "icon": "MdTerrain", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1503", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0006", "title": "Team Sports", "icon": "MdGroups", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1504", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0006", "title": "Water Sports", "icon": "MdPool", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1505", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0006", "title": "Cycling", "icon": "MdDirectionsBike", "status": "ENABLED" },
  
    // Sub-Categories for Fitness (m_1501)
    { "_id": "641a2b3c4d5e6f7a8b9c2501", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1501", "title": "Dumbbells", "icon": "GiDumbbell", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2502", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1501", "title": "Yoga Mats", "icon": "MdAccessibility", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2503", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1501", "title": "Treadmills", "icon": "GiRunningNinja", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2504", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1501", "title": "Resistance Bands", "icon": "MdLinearScale", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2505", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1501", "title": "Gym Gloves", "icon": "GiGloves", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2506", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1501", "title": "Supplements", "icon": "MdVaccines", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2507", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1501", "title": "Exercise Bikes", "icon": "MdPedalBike", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2508", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1501", "title": "Jump Ropes", "icon": "GiJumpRope", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2509", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1501", "title": "Punching Bags", "icon": "GiBoxingGlove", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2510", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1501", "title": "Gym Bags", "icon": "MdShoppingBag", "status": "ENABLED" },
  
    /* ==========================================
       7. AUTOMOTIVE owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), (Parent: ...0007)
       ========================================== */
    { "_id": "641a2b3c4d5e6f7a8b9c1601", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0007", "title": "Car Accessories", "icon": "MdDriveEta", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1602", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0007", "title": "Motorcycle Gear", "icon": "MdTwoWheeler", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1603", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0007", "title": "Car Care", "icon": "MdOutlineCleaningServices", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1604", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0007", "title": "Tools & Equipment", "icon": "MdConstruction", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1605", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0007", "title": "Tires & Wheels", "icon": "GiTireIronCross", "status": "ENABLED" },
  
    // Sub-Categories for Car Accessories (m_1601)
    { "_id": "641a2b3c4d5e6f7a8b9c2601", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1601", "title": "Seat Covers", "icon": "MdEventSeat", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2602", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1601", "title": "Car Audio", "icon": "MdSpeaker", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2603", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1601", "title": "GPS & Navigation", "icon": "MdGpsFixed", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2604", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1601", "title": "Dash Cams", "icon": "MdCameraRoll", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2605", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1601", "title": "Floor Mats", "icon": "MdTexture", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2606", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1601", "title": "Car Chargers", "icon": "MdUsb", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2607", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1601", "title": "Air Fresheners", "icon": "MdCloudQueue", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2608", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1601", "title": "Sun Shades", "icon": "MdWbSunny", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2609", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1601", "title": "Roof Racks", "icon": "MdHorizontalRule", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2610", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1601", "title": "LED Lights", "icon": "MdLightbulb", "status": "ENABLED" },
  
    /* ==========================================
       8. TOYS & KIDS owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), (Parent: ...0008)
       ========================================== */
    { "_id": "641a2b3c4d5e6f7a8b9c1701", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0008", "title": "Baby Toys", "icon": "MdChildFriendly", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1702", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0008", "title": "Remote Control", "icon": "MdSettingsRemote", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1703", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0008", "title": "Educational Toys", "icon": "MdSchool", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1704", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0008", "title": "Dolls & Action Figures", "icon": "GiNinjaHead", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1705", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0008", "title": "Outdoor Play", "icon": "MdKitesurfing", "status": "ENABLED" },
  
    // Sub-Categories for Baby Toys (m_1701)
    { "_id": "641a2b3c4d5e6f7a8b9c2701", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1701", "title": "Soft Toys", "icon": "GiTeddyBear", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2702", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1701", "title": "Rattles", "icon": "MdNotificationsActive", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2703", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1701", "title": "Teethers", "icon": "GiTooth", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2704", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1701", "title": "Play Mats", "icon": "MdGridOn", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2705", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1701", "title": "Musical Toys", "icon": "MdMusicNote", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2706", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1701", "title": "Bath Toys", "icon": "MdBathtub", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2707", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1701", "title": "Building Blocks", "icon": "MdCategory", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2708", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1701", "title": "Walkers", "icon": "MdDirectionsWalk", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2709", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1701", "title": "Strollers", "icon": "MdChildFriendly", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2710", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1701", "title": "Baby Gyms", "icon": "GiGymBag", "status": "ENABLED" },
  
    /* ==========================================
       9. BOOKS & STATIONERY owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), (Parent: ...0009)
       ========================================== */
    { "_id": "641a2b3c4d5e6f7a8b9c1801", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0009", "title": "Fiction Books", "icon": "MdAutoStories", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1802", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0009", "title": "Educational", "icon": "MdMenuBook", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1803", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0009", "title": "Children Books", "icon": "MdFace", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1804", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0009", "title": "Office Supplies", "icon": "MdWorkOutline", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1805", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0009", "title": "Art & Craft", "icon": "MdBrush", "status": "ENABLED" },
  
    // Sub-Categories for Fiction (m_1801)
    { "_id": "641a2b3c4d5e6f7a8b9c2801", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1801", "title": "Mystery", "icon": "MdSearch", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2802", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1801", "title": "Sci-Fi", "icon": "MdRocketLaunch", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2803", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1801", "title": "Romance", "icon": "MdFavorite", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2804", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1801", "title": "Horror", "icon": "GiGhost", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2805", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1801", "title": "Biographies", "icon": "MdPerson", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2806", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1801", "title": "History", "icon": "MdHistory", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2807", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1801", "title": "Comics", "icon": "MdChat", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2808", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1801", "title": "Self-Help", "icon": "MdSelfImprovement", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2809", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1801", "title": "Cookbooks", "icon": "MdRestaurant", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2810", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1801", "title": "Poetry", "icon": "MdEditNote", "status": "ENABLED" },
  
    /* ==========================================
       10. PET SUPPLIES owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), (Parent: ...0010)
       ========================================== */
    { "_id": "641a2b3c4d5e6f7a8b9c1901", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0010", "title": "Dog Supplies", "icon": "GiDogHouse", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1902", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0010", "title": "Cat Supplies", "icon": "MdPets", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1903", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0010", "title": "Fish & Aquatic", "icon": "MdSetMeal", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1904", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0010", "title": "Bird Supplies", "icon": "GiBirdCage", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c1905", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c0010", "title": "Pet Grooming", "icon": "MdContentCut", "status": "ENABLED" },
  
    // Sub-Categories for Dog Supplies (m_1901)
    { "_id": "641a2b3c4d5e6f7a8b9c2901", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1901", "title": "Dog Food", "icon": "MdDining", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2902", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1901", "title": "Dog Toys", "icon": "MdToyS", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2903", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1901", "title": "Collars & Leashes", "icon": "MdLink", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2904", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1901", "title": "Dog Beds", "icon": "MdBed", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2905", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1901", "title": "Grooming Kits", "icon": "MdBrush", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2906", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1901", "title": "Health & Vitamins", "icon": "MdVaccines", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2907", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1901", "title": "Training Pads", "icon": "MdLayers", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2908", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1901", "title": "Clothing", "icon": "GiClothes", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2909", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1901", "title": "Feeding Bowls", "icon": "GiBowlOfFood", "status": "ENABLED" },
    { "_id": "641a2b3c4d5e6f7a8b9c2910", owner: new mongoose.Types.ObjectId("69d10f05945bccf39e5b056c"), "parent": "641a2b3c4d5e6f7a8b9c1901", "title": "Carriers & Cages", "icon": "MdMeetingRoom", "status": "ENABLED" }
];

export const brands = [
    /* ==========================================
       1. FASHION - T-Shirts (categoryId: ...2001)
       ========================================== */
    { "categoryId": "641a2b3c4d5e6f7a8b9c2001", "brand": "Levis", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2001", "brand": "Adidas", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2001", "brand": "Nike", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2001", "brand": "H&M", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2001", "brand": "Zara", "status": "ENABLED" },
  
    /* ==========================================
       2. ELECTRONICS - iPhones (categoryId: ...2102)
       ========================================== */
    { "categoryId": "641a2b3c4d5e6f7a8b9c2102", "brand": "Apple", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2102", "brand": "Foxconn", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2102", "brand": "Belkin", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2102", "brand": "Spigen", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2102", "brand": "Anker", "status": "ENABLED" },
  
    /* ==========================================
       3. ELECTRONICS - Android Phones (categoryId: ...2101)
       ========================================== */
    { "categoryId": "641a2b3c4d5e6f7a8b9c2101", "brand": "Samsung", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2101", "brand": "Google Pixel", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2101", "brand": "Xiaomi", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2101", "brand": "OnePlus", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2101", "brand": "Oppo", "status": "ENABLED" },
  
    /* ==========================================
       4. GROCERIES - Fresh Fruits (categoryId: ...2302)
       ========================================== */
    { "categoryId": "641a2b3c4d5e6f7a8b9c2302", "brand": "Dole", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2302", "brand": "Chiquita", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2302", "brand": "Del Monte", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2302", "brand": "Zespri", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2302", "brand": "Sun World", "status": "ENABLED" },
  
    /* ==========================================
       5. BEAUTY - Moisturizers (categoryId: ...2402)
       ========================================== */
    { "categoryId": "641a2b3c4d5e6f7a8b9c2402", "brand": "CeraVe", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2402", "brand": "Neutrogena", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2402", "brand": "The Ordinary", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2402", "brand": "La Roche-Posay", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2402", "brand": "Olay", "status": "ENABLED" },
  
    /* ==========================================
       6. SPORTS - Dumbbells (categoryId: ...2501)
       ========================================== */
    { "categoryId": "641a2b3c4d5e6f7a8b9c2501", "brand": "Bowflex", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2501", "brand": "Rogue Fitness", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2501", "brand": "CAP Barbell", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2501", "brand": "Amazon Basics", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2501", "brand": "PowerBlock", "status": "ENABLED" },
  
    /* ==========================================
       7. TOYS - Soft Toys (categoryId: ...2701)
       ========================================== */
    { "categoryId": "641a2b3c4d5e6f7a8b9c2701", "brand": "LEGO", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2701", "brand": "Fisher-Price", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2701", "brand": "Gund", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2701", "brand": "Jellycat", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2701", "brand": "Steiff", "status": "ENABLED" }
];

export const sizes = [
    /* ==========================================
       1. FASHION - T-Shirts (categoryId: ...2001)
       International Standard (S, M, L, XL, XXL)
       ========================================== */
    { "categoryId": "641a2b3c4d5e6f7a8b9c2001", "international": "S", "EU": "44-46", "US": "34-36", "UK": "34-36", "waist": null },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2001", "international": "M", "EU": "48-50", "US": "38-40", "UK": "38-40", "waist": null },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2001", "international": "L", "EU": "52-54", "US": "42-44", "UK": "42-44", "waist": null },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2001", "international": "XL", "EU": "56-58", "US": "46-48", "UK": "46-48", "waist": null },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2001", "international": "XXL", "EU": "60-62", "US": "50-52", "UK": "50-52", "waist": null },
  
    /* ==========================================
       2. FASHION - Jeans (categoryId: ...2004)
       Focus on Waist Sizes
       ========================================== */
    { "categoryId": "641a2b3c4d5e6f7a8b9c2004", "international": "28", "EU": "38", "US": "28", "UK": "28", "waist": "28 inches" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2004", "international": "30", "EU": "40", "US": "30", "UK": "30", "waist": "30 inches" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2004", "international": "32", "EU": "42", "US": "32", "UK": "32", "waist": "32 inches" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2004", "international": "34", "EU": "44", "US": "34", "UK": "34", "waist": "34 inches" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2004", "international": "36", "EU": "46", "US": "36", "UK": "36", "waist": "36 inches" },
  
    /* ==========================================
       3. FASHION - Footwear (categoryId: ...1003 - Sub categories under it)
       Shoe Size Mapping
       ========================================== */
    { "categoryId": "641a2b3c4d5e6f7a8b9c1003", "international": "7", "EU": "40", "US": "7.5", "UK": "6.5", "waist": null },
    { "categoryId": "641a2b3c4d5e6f7a8b9c1003", "international": "8", "EU": "41", "US": "8.5", "UK": "7.5", "waist": null },
    { "categoryId": "641a2b3c4d5e6f7a8b9c1003", "international": "9", "EU": "42", "US": "9.5", "UK": "8.5", "waist": null },
    { "categoryId": "641a2b3c4d5e6f7a8b9c1003", "international": "10", "EU": "43", "US": "10.5", "UK": "9.5", "waist": null },
    { "categoryId": "641a2b3c4d5e6f7a8b9c1003", "international": "11", "EU": "44", "US": "11.5", "UK": "10.5", "waist": null },
  
    /* ==========================================
       4. ELECTRONICS - Smartphones Storage (categoryId: ...2101)
       Tech Sizes (RAM/Storage variant approach)
       ========================================== */
    { "categoryId": "641a2b3c4d5e6f7a8b9c2101", "international": "128GB", "EU": null, "US": null, "UK": null, "waist": null },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2101", "international": "256GB", "EU": null, "US": null, "UK": null, "waist": null },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2101", "international": "512GB", "EU": null, "US": null, "UK": null, "waist": null },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2101", "international": "1TB", "EU": null, "US": null, "UK": null, "waist": null },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2101", "international": "2TB", "EU": null, "US": null, "UK": null, "waist": null },
  
    /* ==========================================
       5. HOME - Beds (categoryId: ...2203)
       Furniture Sizes
       ========================================== */
    { "categoryId": "641a2b3c4d5e6f7a8b9c2203", "international": "Single", "EU": "90x200cm", "US": "Twin", "UK": "Single", "waist": null },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2203", "international": "Double", "EU": "140x200cm", "US": "Full", "UK": "Double", "waist": null },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2203", "international": "Queen", "EU": "160x200cm", "US": "Queen", "UK": "King", "waist": null },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2203", "international": "King", "EU": "180x200cm", "US": "King", "UK": "Super King", "waist": null },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2203", "international": "California King", "EU": "200x200cm", "US": "Cal King", "UK": "Emperor", "waist": null }
];

export const materials = [
    /* ==========================================
       1. FASHION - T-Shirts (categoryId: ...2001)
       ========================================== */
    { "categoryId": "641a2b3c4d5e6f7a8b9c2001", "material": "100% Cotton", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2001", "material": "Polyester Blend", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2001", "material": "Organic Cotton", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2001", "material": "Jersey", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2001", "material": "Pima Cotton", "status": "ENABLED" },
  
    /* ==========================================
       2. FASHION - Jeans (categoryId: ...2004)
       ========================================== */
    { "categoryId": "641a2b3c4d5e6f7a8b9c2004", "material": "Denim", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2004", "material": "Stretch Denim", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2004", "material": "Cotton Twill", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2004", "material": "Recycled Polyester", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2004", "material": "Spandex Blend", "status": "ENABLED" },
  
    /* ==========================================
       3. ELECTRONICS - Smartphones (categoryId: ...2101)
       Body Materials
       ========================================== */
    { "categoryId": "641a2b3c4d5e6f7a8b9c2101", "material": "Gorilla Glass Victus", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2101", "material": "Aerospace-grade Aluminum", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2101", "material": "Titanium Frame", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2101", "material": "Polycarbonate", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2101", "material": "Ceramic Back", "status": "ENABLED" },
  
    /* ==========================================
       4. HOME - Furniture/Sofas (categoryId: ...2201)
       ========================================== */
    { "categoryId": "641a2b3c4d5e6f7a8b9c2201", "material": "Genuine Leather", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2201", "material": "Velvet Fabric", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2201", "material": "Solid Oak Wood", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2201", "material": "Linen Blend", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2201", "material": "Microfiber", "status": "ENABLED" },
  
    /* ==========================================
       5. AUTOMOTIVE - Seat Covers (categoryId: ...2601)
       ========================================== */
    { "categoryId": "641a2b3c4d5e6f7a8b9c2601", "material": "Faux Leather (Rexine)", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2601", "material": "Neoprene", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2601", "material": "Polyester Mesh", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2601", "material": "Sheepskin", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c2601", "material": "Suede", "status": "ENABLED" },
  
    /* ==========================================
       6. KITCHENWARE - Cooking Pots (categoryId: ...1202 - Sub)
       ========================================== */
    { "categoryId": "641a2b3c4d5e6f7a8b9c1202", "material": "Stainless Steel", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c1202", "material": "Cast Iron", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c1202", "material": "Non-Stick Aluminum", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c1202", "material": "Copper", "status": "ENABLED" },
    { "categoryId": "641a2b3c4d5e6f7a8b9c1202", "material": "Ceramic Coating", "status": "ENABLED" }
];
