import mongoose,{Types} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/** Types */
import type {UserDocument} from "../interfaces/user.interfaces";
import type { JsonWebTokenError } from "jsonwebtoken";
import env from "../constants/loadEnv";

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
    avatar:{
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
    location:{
        type:{    
            city:{
                type:String,
                default:null
            },
            country:{
                type:String,
                defualt:null
            }
        }
    },
    lastSeen:{
        type:Date,
        default:Date.now()
    },
    password:{
        type:String,
        default:null
    },
    refreshToken:{
        type:String,
        default:null
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
/** Note: Generating refresh token for authentication */
UserSchema.methods.GenerateRefreshToken = async function (): Promise<string>{
    try {
        const refresh_toke_payload = {
            _id:this._id
        };
        /** Credentials */
        const REFRESH_TOKEN_SECRET = env.REFRESH_TOKEN_SECRET;
        const REFRESH_TOKEN_EXPIRY = env.REFRESH_TOKEN_EXPIRY || "15d";
        if(!REFRESH_TOKEN_SECRET || !REFRESH_TOKEN_EXPIRY){
            throw new Error(`Error: ACCESS_TOKEN_EXPIRY or ACCESS_TOKEN_EXPIRY is missing.`)
        }
        const expireIn = /^\d+$/.test(REFRESH_TOKEN_EXPIRY)
        ? parseInt(REFRESH_TOKEN_EXPIRY,10)
        : REFRESH_TOKEN_EXPIRY;

        const jwt_token = await jwt.sign(refresh_toke_payload, REFRESH_TOKEN_SECRET as string,{
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