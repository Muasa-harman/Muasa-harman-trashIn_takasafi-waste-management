import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/Prisma.service';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();

    const operationName = gqlContext.getInfo().fieldName;

    // Allow logoutDrive to bypass token validation
    if (operationName === 'logOutDriver') {
      return true;
    }
    const accessToken = req.headers.accesstoken as string;
    const refreshToken = req.headers.refreshtoken as string;

    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException('Please login to access this service');
    }
    try {
      const decoded = this.jwtService.verify(accessToken, {
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
      });
      if (!decoded) {
        throw new UnauthorizedException('Invalid access token!');
      }
      await this.updateAccessToken(req);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired tokens');
    }
    return true;
  }
  private async updateAccessToken(req: any): Promise<void> {
    try {
      const refreshTokenData = req.headers.refreshtoken as string;
      const decoded = this.jwtService.verify(refreshTokenData, {
        secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
      });
      if (!decoded) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const driver = await this.prisma.driver.findUnique({
        where: {
          id: decoded.id,
        },
      });
      if (!driver) {
        throw new UnauthorizedException('Invalid driver associated with');
      }
      const accessToken = this.jwtService.sign(
        { id: driver.id },
        {
          secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: '25min',
        },
      );
      const refreshToken = this.jwtService.sign(
        { id: driver.id },
        {
          secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
          expiresIn: '7d',
        },
      );
      req.accesstoken = accessToken;
      req.refreshtoken = refreshToken;
      req.driver = driver;
    } catch (error) {
      console.error(error);
    }
  }
}
