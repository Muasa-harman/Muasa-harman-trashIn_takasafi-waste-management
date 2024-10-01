import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
// import { Track } from '../tracks/entities/tracks.entities';
import { Company } from '@prisma/client';

export class TokenSender {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  public sendToken(company:Company) {
    const accessToken = this.jwt.sign(
      {
        id: company.id,
      },
      {
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '1m',
      },
    );

    const refreshToken = this.jwt.sign(
      {
        id: company.id,
      },
      {
        secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: '3d',
      },
    );
    return { company, accessToken, refreshToken };
  }
}
