import { Injectable, OnModuleInit } from "@nestjs/common";
import {PrismaClient} from '@prisma/client'



@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
    async onModuleInit() {
        try {
            await this.$connect();
            console.log("Database connected successfully")
        } catch (error) {
            console.error("Error connecting to the database", error)
        }
    }
   

    // async enableShutdownHooks(app: INestApplication) {
    //     this.$on('beforeExit', async () => {
    //       await app.close();
    //     });
    //   }
}