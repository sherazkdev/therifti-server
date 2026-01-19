import type {Types,Document} from "mongoose";

export enum ProductCondition {
  NEW_WITH_TAGS = "NEW_WITH_TAGS",
  NEW_WITHOUT_TAGS = "NEW_WITHOUT_TAGS",
  VERY_GOOD = "VERY_GOOD",
  GOOD = "GOOD",
  SATISFACTORY = "SATISFACTORY",
};

export enum ProductMaterial {
  ACRYLIC = "ACRYLIC",
  ALPACA = "ALPACA",
  BAMBOO = "BAMBOO",
  CANVAS = "CANVAS",
  CARDBOARD = "CARDBOARD",
  CASHMERE = "CASHMERE",
  CERAMIC = "CERAMIC",
  CHIFFON = "CHIFFON",
  CORDUROY = "CORDUROY",
  COTTON = "COTTON",
  DENIM = "DENIM",
  DOWN = "DOWN",
  ELASTANE = "ELASTANE",
  FAUX_FUR = "FAUX_FUR",
  FAUX_LEATHER = "FAUX_LEATHER",
  FELT = "FELT",
  FLANNEL = "FLANNEL",
  FLEECE = "FLEECE",
  FOAM = "FOAM",
  GLASS = "GLASS",
  GOLD = "GOLD",
  JUTE = "JUTE",
  LACE = "LACE",
  LATEX = "LATEX",
  LEATHER = "LEATHER",
  LINEN = "LINEN",
  MERINO = "MERINO",
  MESH = "MESH",
  METAL = "METAL",
  MOHAIR = "MOHAIR",
  NEOPRENE = "NEOPRENE",
  NYLON = "NYLON",
  PAPER = "PAPER",
  PATENT_LEATHER = "PATENT_LEATHER",
  PLASTIC = "PLASTIC",
  POLYESTER = "POLYESTER",
  PORCELAIN = "PORCELAIN",
  RATTAN = "RATTAN",
  RAYON = "RAYON",
  RUBBER = "RUBBER",
  SATIN = "SATIN",
  SEQUIN = "SEQUIN",
  SILICONE = "SILICONE",
  SILK = "SILK",
  SILVER = "SILVER",
  STEEL = "STEEL",
  STONE = "STONE",
  STRAW = "STRAW",
  SUEDE = "SUEDE",
  TULLE = "TULLE",
  TWEED = "TWEED",
  VELOUR = "VELOUR",
  VELVET = "VELVET",
  WOOD = "WOOD",
  WOOL = "WOOL",
}
export enum ProductColor {
  BLACK = "BLACK",
  WHITE = "WHITE",
  GREY = "GREY",
  BROWN = "BROWN",
  BEIGE = "BEIGE",

  RED = "RED",
  MAROON = "MAROON",
  PINK = "PINK",
  PURPLE = "PURPLE",
  ORANGE = "ORANGE",
  YELLOW = "YELLOW",

  BLUE = "BLUE",
  NAVY = "NAVY",
  TEAL = "TEAL",
  GREEN = "GREEN",
  OLIVE = "OLIVE",

  GOLD = "GOLD",
  SILVER = "SILVER",

  MULTICOLOR = "MULTICOLOR",
}
export enum ProductSize {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE"
}
export enum ProductStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    DELETED = "DELETED"
}

export interface ProductInterface {
    categoryId:Types.ObjectId,
    owner:Types.ObjectId,
    title:string,
    description:string,
    condition:ProductCondition,
    brand:Types.ObjectId,
    coverImage:string,
    colors:ProductColor[],
    material:ProductMaterial,
    size:ProductSize,
    price:number,
    status:ProductStatus,
};

export interface ProductDocument extends ProductInterface, Document {};