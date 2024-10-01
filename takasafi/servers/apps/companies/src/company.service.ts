import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService, JwtVerifyOptions } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "./email/email.service";
import { ActivationDto, LoginDto, RegisterDto } from "./dto/company.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { TokenSender } from "./utils/send.token";
import { CreateTrackDto } from "./trucks/dto/tracks.dto";

interface Company {
  name: string;
  country: string;
  city: string;
  address: string;
  email: string;
  phone_number: number;
  password: string;
}

interface Track{
  driver: string;
  route: string;
  description: string;
  options: [];
  image: string;
  area: string; 
  city: string; 
  phone_number: number;
  plate_number: string;
  name: string;
  category: string;
}

@Injectable()
export class CompanyService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService
  ) {}

  // register company service
  async registerCompany(registerDto: RegisterDto, response: Response) {
    const { name, country, city, address, email, phone_number, password } =
      registerDto as Company;

    const isEmailExist = await this.prisma.company.findUnique({
      where: {
        email,
      },
    });
    if (isEmailExist) {
      throw new BadRequestException(
        "Company already exist with this email!"
      );
    }

    const companyWithPhoneNumber = await this.prisma.company.findUnique({
      where: {
        phone_number,
      },
    });

    if (companyWithPhoneNumber) {
      throw new BadRequestException(
        "Company already exist with this phone number!"
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const company: Company = {
      name,
      country,
      city,
      address,
      email,
      phone_number,
      password: hashedPassword,
    };

    const activationToken = await this.createActivationToken(company);

    const client_side_uri = this.configService.get<string>("CLIENT_SIDE_URI");

    const activation_token = `${client_side_uri}/activate-account/${activationToken}`;

    await this.emailService.sendMail({
      email,
      subject: "Activate your company account!",
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
  async createActivationToken(company: Company) {
    const activationToken = this.jwtService.sign(
      {
        company,
      },
      {
        secret: this.configService.get<string>("JWT_SECRET_KEY"),
        expiresIn: "5m",
      }
    );
    return activationToken;
  }

  // activation company
  async activateCompany(activationDto: ActivationDto, response: Response) {
    const { activationToken } = activationDto;

    const newCompany: {
      exp: number;
      company: Company;
      activationToken: string;
    } = this.jwtService.verify(activationToken, {
      secret: this.configService.get<string>("JWT_SECRET_KEY"),
    } as JwtVerifyOptions);

    if (newCompany?.exp * 1000 < Date.now()) {
      throw new BadRequestException("Invalid activation code");
    }

    const { name, country, city, phone_number, password, email, address } =
      newCompany.company;

    const existCompany = await this.prisma.company.findUnique({
      where: {
        email,
      },
    });

    if (existCompany) {
      throw new BadRequestException(
        "Company already exist with this email!"
      );
    }

    const company = await this.prisma.company.create({
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

    return { company, response };
  }

  // Login restaurant
  async LoginCompany(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const company = await this.prisma.company.findUnique({
      where: {
        email,
      },
    });

    if (
      company &&
      (await this.comparePassword(password, company.password))
    ) {
      const tokenSender = new TokenSender(this.configService, this.jwtService);
      return tokenSender.sendToken(company);
    } else {
      return {
        user: null,
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

  // get logged in company
  async getLoggedInCompany(req: any) {
    const company = req.company;
    const refreshToken = req.refreshtoken;
    const accessToken = req.accesstoken;
    return { company, accessToken, refreshToken };
  }


 
  // log out company
  async Logout(req: any) {
    req.company = null;
    req.refreshtoken = null;
    req.accesstoken = null;
    return { message: "Logged out successfully!" };
  }

}
