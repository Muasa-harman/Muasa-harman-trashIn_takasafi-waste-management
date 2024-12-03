import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/Prisma.service';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email/email.service';
import { ActivationDto, LoginDto, RegisterDto } from './dto/driver.dto';
import * as bcrypt from 'bcrypt';
import { TokenSender } from './utils/sendToken';

interface DriverData{
    name:string;
    email:string;
    password:string;
    phoneNumber:number;
}

@Injectable()
export class DriverService {
    constructor(
        private readonly jwtService:JwtService,
        private readonly prisma:PrismaService,
        private readonly configService:ConfigService,
        private readonly emailService:EmailService
    ){}
    async register(registerDto:RegisterDto,response:Response){
        const {name,email,password,phoneNumber} = registerDto;
        const IsEmailExist = await this.prisma.driver.findUnique({
            where:{
                email,
            },
        });
        if(IsEmailExist){
            throw new BadRequestException('driver already exist with this email');
        }
        const isPhoneNumberExist = await this.prisma.driver.findFirst({
            where:{
                phoneNumber,
            }
        });
        if(isPhoneNumberExist){
            throw new BadRequestException(
                'Driver already exist with this phone number',
            );
        }
        const hashedPassword = await bcrypt.hash(password,10);

        // create driver in db
        const driver = {
            name,email,password:hashedPassword,
            phoneNumber,role:'DRIVER'
        };
        // generate activation token
        const activationToken = await this.createActivationToken(driver);
        const activationCode = activationToken.activationCode
        const activation_token = activationToken.token;
        
        // send activation email
        await this.emailService.sendMail({
            email,subject:'Activate your account!',
            template:'./activation-mail',
            name,
            activationCode
        });
        return {activation_token,response};
    }
    // create activation token
    async createActivationToken(driver:DriverData){
        const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

        const token = this.jwtService.sign({
            driver,activationCode,
        },
        {
            secret:this.configService.get<string>('ACTIVATION_SECRET'),
            expiresIn:'5min',
        }
    );
    return {token,activationCode}
    }
    // driver activation
    async activateDriver(activationDto:ActivationDto,response:Response){
        const {activationCode,activationToken} = activationDto;
        const newDriver:{driver:DriverData,activationCode:string} = this.jwtService.verify(activationToken,{
            secret:this.configService.get<string>('ACTIVATION_SECRET'),
        } as JwtVerifyOptions ) as {driver:DriverData,activationCode:string};
        if(newDriver.activationCode !== activationCode){
            throw new BadRequestException('Invalid activation code');
        }
        const {name,email,password,phoneNumber} = newDriver.driver;
        const existDriver = await this.prisma.driver.findUnique({
            where:{
                email,
            },
        });
        if(existDriver){
            throw new BadRequestException('Driver already exist with this email');
        }
        const driver = await this.prisma.driver.create({
            data:{
                name,email,password,phoneNumber,role:'DRIVER',
            },
        })
        return {driver,response}
    }
    // login service
    async Login(loginDto:LoginDto){
        const {email,password} = loginDto;

        // fetch driver details from the database
        const driver = await this.prisma.driver.findUnique({
            where:{
                email,
            },
        });
        // validate password and generate tokens
        if(driver && (await this.comparePassword(password,driver.password))){
            const tokenSender = new TokenSender(this.configService,this.jwtService);
            const tokens = tokenSender.sendToken(driver);

            // include driver data in the response
            return{
                driver,...tokens
            }
        }else{
            return{
                driver:null,
                accessToken:null,
                refreshToken:null,
                error:{
                    message:'Invalid email or password',
                },
            };
        }
    }
    // compare password with hashed password
    async comparePassword(
        password:string,
        hashedPassword:string,
    ): Promise<boolean>{
        return await bcrypt.compare(password,hashedPassword);
    }
    // get logged in user
    async getLoggedInDriver(req:any){
        const driver = req.driver;
        const accessToken = req.accesstoken;
        const refreshToken = req.refreshtoken;

        return {driver,refreshToken,accessToken};
    }
    // get all drivers
    async getDrivers(){
        return this.prisma.driver.findMany({});
    }
    async LogOutDriver(req:any){
        req.driver = null;
        req.refreshtoken = null;
        req.accesstoken = null;

        return{message:'Logged out successfully'}
    }
}
