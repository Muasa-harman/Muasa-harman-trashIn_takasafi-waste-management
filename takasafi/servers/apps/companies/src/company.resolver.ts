import { Args, Context, Mutation, Resolver, Query } from "@nestjs/graphql";
import { CompanyService } from "./company.service";
import {
  ActivationResponse,
  LoginResponse,
  LogoutResposne,
  RegisterResponse,
} from "./types/company.type";
import { ActivationDto, RegisterDto } from "./dto/company.dto";
import { Response, Request } from "express";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "./guards/auth.guard";

@Resolver("Company")
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Mutation(() => RegisterResponse)
  async registerCompany(
    @Args("registerDto") registerDto: RegisterDto,
    @Context() context: { res: Response }
  ): Promise<RegisterResponse> {
    const { message } = await this.companyService.registerCompany(
      registerDto,
      context.res
    );
    return { message };
  }

  @Mutation(() => ActivationResponse)
  async activateCompany(
    @Args("activationDto") activationDto: ActivationDto,
    @Context() context: { res: Response }
  ): Promise<ActivationResponse> {
    return await this.companyService.activateCompany(
      activationDto,
      context.res
    );
  }

  @Mutation(() => LoginResponse)
  async LoginCompany(
    @Args("email") email: string,
    @Args("password") password: string
  ): Promise<LoginResponse> {
    return await this.companyService.LoginCompany({ email, password });
  }

  @Query(() => LoginResponse)
  @UseGuards(AuthGuard)
  async getLoggedInCompany(
    @Context() context: { req: Request }
  ): Promise<LoginResponse> {
    return await this.companyService.getLoggedInCompany(context.req);
  }

  @Query(() => LogoutResposne)
  @UseGuards(AuthGuard)
  async logOutCompany(@Context() context: { req: Request }) {
    return await this.companyService.Logout(context.req);
  }
}
