import { Args, Context, Mutation, Resolver, Query } from "@nestjs/graphql";
import { AdminService } from "./admin.service";
import {
  ActivationResponse,
  LoginResponse,
  LogoutResposne,
  RegisterResponse,
} from "./types/admin.type";
import { ActivationDto, RegisterDto } from "./dto/admin.dto";
import { Response, Request } from "express";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "./guards/auth.guard";

@Resolver("Admin")
export class AdminResolver {
  constructor(private readonly adminService: AdminService
) {}

  @Mutation(() => RegisterResponse)
  async registerAdmin(
    @Args("registerDto") registerDto: RegisterDto,
    @Context() context: { res: Response }
  ): Promise<RegisterResponse> {
    const { message } = await this.adminService.registerAdmin(
      registerDto,
      context.res
    );
    return { message };
  }

  @Mutation(() => ActivationResponse)
  async activateAdmin(
    @Args("activationDto") activationDto: ActivationDto,
    @Context() context: { res: Response }
  ): Promise<ActivationResponse> {
    return await this.adminService.activateAdmin(
      activationDto,
      context.res
    );
  }

  @Mutation(() => LoginResponse)
  async LoginAdmin(
    @Args("email") email: string,
    @Args("password") password: string
  ): Promise<LoginResponse> {
    return await this.adminService.LoginAdmin({ email, password });
  }

  @Query(() => LoginResponse)
  @UseGuards(AuthGuard)
  async getLoggedInAdmin(
    @Context() context: { req: Request }
  ): Promise<LoginResponse> {
    return await this.adminService.getLoggedInAdmin(context.req);
  }

  @Query(() => LogoutResposne)
  @UseGuards(AuthGuard)
  async logOutAdmin(@Context() context: { req: Request }) {
    return await this.adminService.Logout(context.req);
  }
}
