import { Args, Context, Mutation, Resolver,Query } from '@nestjs/graphql';
import { DriverService } from './driver.service';
import { ActivationResponse, LoginResponse, LogoutResponse, RegisterResponse } from './types/driver.types';
import { ActivationDto, RegisterDto } from './dto/driver.dto';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';

@Resolver('Driver')
export class DriverResolver {
    constructor(
        private readonly driverService:DriverService
    ){}
    @Mutation(()=>RegisterResponse)
    async register(
        @Args('registerDto') registerDto:RegisterDto,
        @Context() context:{res: Response},
    ): Promise<RegisterResponse>{
        if(!registerDto.name || !registerDto.email  || !registerDto.password){
            throw new BadRequestException('Please fill all the fields')
        }
        const {activation_token} = await this.driverService.register(registerDto,context.res)
        return {activation_token};
    }

    @Mutation(()=>ActivationResponse)
    async activateDriver(
        @Args('activationDto') activationDto:ActivationDto,
        @Context() context:{res:Response},
    ):Promise<ActivationResponse>{
        return await this.driverService.activateDriver(activationDto,context.res);
    }

    @Mutation(()=>LoginResponse)
    async Login(
        @Args('email') email:string,
        @Args('password') password:string,
    ):Promise<LoginResponse>{
        return await this.driverService.Login({email,password});
    }

    @Query(()=>LoginResponse)
    @UseGuards(AuthGuard)
    async getLoggedInDriver(@Context() context:{req:Request}):Promise<LoginResponse>{
        return await this.driverService.getLoggedInDriver(context.req);
    }

    @Query(()=>LogoutResponse)
    @UseGuards(AuthGuard)
    async logOutDriver(@Context() context:{req:Request}):Promise<LogoutResponse>{
        return await this.driverService.LogOutDriver(context.req)
    }
    
}
