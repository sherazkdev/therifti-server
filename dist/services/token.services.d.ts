import { type CreateTokenInterface, type CreateTokenResponseInterface, type FindValidTokenInterface, type TokenDocument, type VerifyResetTokenInterface } from "../interfaces/token.interfaces.js";
declare class TokenServices {
    /**
     * Note: Generating raw and hashed token.
     * @param null.
     * @returns ResetTokenResultInterface.
    */
    private GenerateResetToken;
    /**
     * Note: Token verifier and mark isUsed.
     * @param resetTokenObject - hashedToken.
     * @param resetTokenObject - rawToken.
     * @returns Boolean.
    */
    VerifyResetToken(resetTokenObject: VerifyResetTokenInterface): Promise<Boolean>;
    /**
     * Note: Create token for verification.
     * @param userObject - userId.
     * @param userObject - type.
     * @returns CreatedToken.
    */
    CreateToken(userObject: CreateTokenInterface): Promise<CreateTokenResponseInterface>;
    /**
     * Note: Token finder using userId and type.
     * @param tokenObject - userId.
     * @param tokenObject - type.
     * @returns tokenDocument.
    */
    FindValidToken(tokenObject: FindValidTokenInterface): Promise<TokenDocument>;
}
export default TokenServices;
//# sourceMappingURL=token.services.d.ts.map