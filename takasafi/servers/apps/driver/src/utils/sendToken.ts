import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Driver } from "../entities/driver.entity";

export class TokenSender{
    constructor(
        private readonly config:ConfigService,
        private readonly jwt: JwtService,
    ){}
    public sendToken(driver:Driver){
        const accessToken = this.jwt.sign(
            {id:driver.id},
            {secret:this.config.get<string>('ACCESS_TOKEN_SECRET'),}
        );
        const refreshToken = this.jwt.sign({
            id:driver.id,
        },{
            secret:this.config.get<string>('REFRESH_TOKEN_SECRET'),
            expiresIn:'3d'
        });
        return {driver, accessToken,refreshToken}
    }
}