import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';


@Module({
  imports: [ConfigModule,
    MailerModule.forRootAsync({imports:[ConfigModule],useFactory:async(config:ConfigService)=>({
      transport:{
        host:config.get<string>('SMTP_HOST'),
        secure:true,
        auth:{
          user:config.get<string>('SMTP_MAIL'),
          pass:config.get<string>('SMTP_PASSWORD')
        },
      },
      defaults:{
        from:'Safari',
      },
      template:{
        dir:join(__dirname, "../../../../servers/email-templates"),
        adapter:new EjsAdapter(),
        options:{
          strict:false
        }
      }
    }),
    inject: [ConfigService],
  })],
  providers:[EmailService],
  exports:[EmailService]
})
export class EmailModule {}
