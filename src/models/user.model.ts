import mongoose,{Types} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/** Types */
import {UserGender, UserTypesEnum, type UserDocument} from "../interfaces/user.interfaces.js";
import type { JsonWebTokenError } from "jsonwebtoken";
import env from "../constants/loadEnv.js";
import { UserStatusEnum } from "../interfaces/user.interfaces.js";

/** UserSchema */
const UserSchema = new mongoose.Schema<UserDocument>({
    googleId:{
        type:String,
        default:null,
    },
    facebookeId:{
        type:String,
        default:null,
    },
    appleId:{
        type:String,
        default:null
    },
    fullname:{
        type:String,
        default:null
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    username:{
        type:String,
        unique:true,    
        default:null
    },
    avatar:{
        type:String,
        default:null
    },
    about:{
        type:String,
        default:null
    },
    phoneNumber:{
        type:{
            countryCode:{
                type:String,
                defualt:null
            },
            nationalNumber:{
                type:String,
                defualt:null
            }
        },
        default:{}
    },
    dob:{
        type:Date,
        default:null
    },
    gender:{
        type:String,
        enum:Object.values(UserGender),
        default:null
    },
    lastSeen:{
        type:Date,
        default:Date.now()
    },
    password:{
        type:String,
        default:null
    },
    isVerfied:{
        type:Boolean,
        required:true
    },
    status:{
        type:String,
        enum:Object.values(UserStatusEnum),
        default:UserStatusEnum.ACTIVATED
    },
    type:{
        type:String,
        enum:Object.values(UserTypesEnum),
        default:UserTypesEnum.USER
    }
},{timestamps:true});

/** Note: User create after call this function */
UserSchema.pre<UserDocument>("save", async function(next){
    try {
        if(!this.isModified("password") || !this.password){
            return;
        }
        const password = this.password;
        const SALT_ROUNDS:number = 10;
        const GEN_SALT:string = await bcrypt.genSalt(SALT_ROUNDS);
        const hashed_password = await bcrypt.hash(password,GEN_SALT);
        /** Assign the hashedPassword */
        this.password = hashed_password;
    } catch (e:any) {
        throw new Error(e);
    }
});
/** Note: Generating access token for authentication */
UserSchema.methods.GenerateAccessToken = async function (): Promise<string>{
    try {
        const access_toke_payload = {
            _id:this._id
        };
        /** Credentials */
        const ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET;
        const ACCESS_TOKEN_EXPIRY = env.ACCESS_TOKEN_EXPIRY || "10d";
        if(!ACCESS_TOKEN_SECRET || !ACCESS_TOKEN_EXPIRY){
            throw new Error(`Error: ACCESS_TOKEN_EXPIRY or ACCESS_TOKEN_EXPIRY is missing.`)
        }
        const expireIn = /^\d+$/.test(ACCESS_TOKEN_EXPIRY)
        ? parseInt(ACCESS_TOKEN_EXPIRY,10)
        : ACCESS_TOKEN_EXPIRY;

        const jwt_token = await jwt.sign(access_toke_payload, ACCESS_TOKEN_SECRET as string,{
            expiresIn:expireIn as any
        });
        return jwt_token;
    } catch (e: JsonWebTokenError | any) {
        throw new Error(e);
    }
};
/** UserModel */
const UserModel = mongoose.model<UserDocument>("User",UserSchema);
export default UserModel;