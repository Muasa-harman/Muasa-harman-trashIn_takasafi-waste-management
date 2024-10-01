import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService, JwtVerifyOptions } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "./email/email.service";
import { ActivationDto, LoginDto, RegisterDto } from "./dto/admin.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { TokenSender } from "./utils/send.token";

interface Admin {
  name: string;
  country: string;
  city: string;
  address: string;
  email: string;
  phone_number: number;
  password: string;
}

@Injectable()
export class AdminService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService
  ) {}

  // register admin service
  async registerAdmin(registerDto: RegisterDto, response: Response) {
    const { name, country, city, address, email, phone_number, password } =
      registerDto as Admin;

    const isEmailExist = await this.prisma.admin.findUnique({
      where: {
        email,
      },
    });
    if (isEmailExist) {
      throw new BadRequestException(
        "Admin already exist with this email!"
      );
    }

    const adminsWithPhoneNumber = await this.prisma.admin.findUnique({
      where: {
        phone_number,
      },
    });

    if (adminsWithPhoneNumber) {
      throw new BadRequestException(
        "Admin already exist with this phone number!"
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // create admin in the db

    const admin: Admin = {
      name,
      country,
      city,
      address,
      email,
      phone_number,
      password: hashedPassword,
    };

    const activationToken = await this.createActivationToken(admin);

    const client_side_uri = this.configService.get<string>("CLIENT_SIDE_URI");

    const activation_token = `${client_side_uri}/activate-account/${activationToken}`;

    await this.emailService.sendMail({
      email,
      subject: "Activate your admin account!",
      template: "./activation-mail",
      name,
      activation_token,
    });

    return {
      message: "Please check your email to activate your account",
      response,
    };
  }

  // create activation token
  async createActivationToken(admin: Admin) {
    const activationToken = this.jwtService.sign(
      {
        admin,
      },
      {
        secret: this.configService.get<string>("JWT_SECRET_KEY_ADMIN"),
        expiresIn: "5m",
      }
    );
    return activationToken;
  }

  // activation admin
  async activateAdmin(activationDto: ActivationDto, response: Response) {
    const { activationToken } = activationDto;

    const newAdmin: {
      exp: number;
      admin: Admin;
      activationToken: string;
    } = this.jwtService.verify(activationToken, {
      secret: this.configService.get<string>("JWT_SECRET_KEY_ADMIN"),
    } as JwtVerifyOptions);

    if (newAdmin?.exp * 1000 < Date.now()) {
      throw new BadRequestException("Invalid activation code");
    }

    const { name, country, city, phone_number, password, email, address } =
      newAdmin.admin;

    const existAdmin = await this.prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (existAdmin) {
      throw new BadRequestException(
        "Admin already exist with this email!"
      );
    }

    const admin = await this.prisma.admin.create({
      data: {
        name,
        email,
        address,
        country,
        city,
        phone_number,
        password,
      },
    });

    return { admin, response };
  }

  // Login restaurant
  async LoginAdmin(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const admin = await this.prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (
      admin &&
      (await this.comparePassword(password, admin.password))
    ) {
      const tokenSender = new TokenSender(this.configService, this.jwtService);
      return tokenSender.sendToken(admin);
    } else {
      return {
        admin: null,
        accessToken: null,
        refreshToken: null,
        error: {
          message: "Invalid email or password",
        },
      };
    }
  }

  // compare with hashed password
  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // get logged in admin
  async getLoggedInAdmin(req: any) {
    const admin = req.admin;
    const refreshToken = req.refreshtoken;
    const accessToken = req.accesstoken;
    return { admin, accessToken, refreshToken };
  }

  // log out admin
  async Logout(req: any) {
    req.admin = null;
    req.refreshtoken = null;
    req.accesstoken = null;
    return { message: "Logged out successfully!" };
  }
// delete company
  async deleteCompany(){}
  
}
