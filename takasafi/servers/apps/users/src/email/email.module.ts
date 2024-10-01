import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import {EjsAdapter} from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Global()
@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) =>({
        transport: {
          host: config.get<string>('SMTP_HOST'),
          secure: true,
          auth: {
            user: config.get<string>('SMTP_MAIL'),
            pass: config.get<string>('SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: 'Mazingira',
        },
        template: {
          dir: join(__dirname, "../../../../servers/email-templates"),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          }
        }
      }),
      inject: [ConfigService],
    })
  ],
  providers: [EmailService],
  exports: [EmailService]

})
export class EmailModule {}
