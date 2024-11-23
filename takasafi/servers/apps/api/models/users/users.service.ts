import { BadRequestException,Injectable,UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../common/prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import {v4 as uuid } from 'uuid'
import { JwtService } from "@nestjs/jwt";
import { LoginInput, LoginOutput, RegisterWithCredentialsInput, RegisterWithProviderInput } from "./dtos/create-user.input";

@Injectable()
export class UsersService{
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ){}
    registerWithProvider({image,name,uid,type}: RegisterWithProviderInput){
        return this.prisma.user.create({
            data: {
                uid,
                name,
                image,
                AuthProvider:{
                    create: {
                        type,
                    }
                }
            }
        })
    }

    async registerWithCredentials({
        email,name,password,image,
    }: RegisterWithCredentialsInput){
        const existingUser = await this.prisma.credentials.findUnique({
            where: {email},
        })

        if(existingUser){
            throw new BadRequestException('User already exist with this email.')
        }
        // hash the password
        const salt = bcrypt.genSaltSync()
        const passwordHash = bcrypt.hashSync(password,salt)

        const uid = uuid()

        return this.prisma.user.create({
            data: {
                uid,name,image,credentials:{
                    create:{
                        email,passwordHash,
                    },
                },
                AuthProvider:{
                    create:{
                        type: 'CREDENTIALS',
                        
                    },
                },
            },
            include: {
                Credentials:true
            }
        })
    }
    async login({
        email,password
    }: LoginInput):Promise<LoginOutput>{
        const user = await this.prisma.user.findFirst({
            where: {
                Credential: {email}
            },
            include:{
                Credentials: true,
            },
        })

        if(!user){
            throw new UnauthorizedException('Invalid email or password')
        }

        const isPasswordValid = bcrypt.compareSync(
            password,user.Credentials.passwordHash,
        )
        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid email or password')
        }

        const jwtToken = this.jwtService.sign(
            {uid: user.uid},
            {
                algorithm: 'HS256',
            },
        )
        return {token: jwtToken,user}
    }
    findAll(args: FindUniqueUserArgs){
        return this.prisma.user.findUnique(args)
    }
}