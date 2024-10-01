import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '@prisma/client';

export class TokenSender {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  public sendToken(admin: Admin) {
    const accessToken = this.jwt.sign(
      {
        id: admin.id,
      },
      {
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET_ADMIN'),
        expiresIn: '1m',
      },
    );

    const refreshToken = this.jwt.sign(
      {
        id: admin.id,
      },
      {
        secret: this.config.get<string>('REFRESH_TOKEN_SECRET_ADMIN'),
        expiresIn: '3d',
      },
    );
    return { admin, accessToken, refreshToken };
  }
}
