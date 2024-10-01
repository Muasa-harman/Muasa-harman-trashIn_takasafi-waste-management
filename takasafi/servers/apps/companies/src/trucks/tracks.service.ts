import { PrismaService } from "apps/companies/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "../email/email.service";
import { CreateTrackDto, DeleteTrackDto } from "./dto/tracks.dto";
import { Response } from "express";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

type Images = {
  public_id: string;
  url: string;
};

type Track = {
  route:string,
  name: string;
  description:string;
  driver: string;
  mobile: string;
  number_plate: string;
  price: number;
  on_demandPrice:number,
  category: string;
  images: Images[] | any;
};

@Injectable()
export class TracksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly cloudinaryService: CloudinaryService
  ) {}
  // create track
  async createTrack(createTrackDto: CreateTrackDto, req: any, response: Response) {
    try {
      const { name,on_demandPrice, number_plate,driver,mobile, price, category, images,route,description } =
      createTrackDto as Track;
      const companyId = req.company?.id;

      let trackImages: Images | any = [];

      for (const image of images) {
        if (typeof image === "string") {
          const data = await this.cloudinaryService.upload(image);
          trackImages.push({
            public_id: data.public_id,
            url: data.secure_url,
          });
        }
      }

      const trackData = {
        route,
        name,
        driver,
        on_demandPrice,
        number_plate,
        mobile,
        price,
        category,
        images: {
          create: trackImages.map(
            (image: { public_id: string; url: string }) => ({
              public_id: image.public_id,
              url: image.url,
            })
          ),
        },
        description,
        companyId,
      };

      await this.prisma.tracks.create({
        data: trackData,
      });

      return { message: "Track Created Successfully!" };
    } catch (error) {
      return { message: error };
    }
  }
   // get all tracks
   async getAllTracks(req: any,res: Response){
    const companyId = req.company?.id;

    const tracks = await this.prisma.tracks.findMany({
      where:{
        companyId,
      },
      include: {
        images: true,
        company: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return tracks;
   }

   // get all the orders
   async getAllOrders(req,res){}
 
    // delete tracks
    async deleteTracks(req,res){}
 
    //get logged in company
  async getLoggedInCompanyTrack(req: any, res: Response) {
    const company = req.company;
    const accessToken = req.accesstoken;
    const refreshToken = req.refreshtoken;

    // console.log({user,refreshToken,accessToken});
    return {company, refreshToken, accessToken}
  }

  // delete tracks of a company
  async deleteTrack(deleteTrackDto: DeleteTrackDto, req: any) {
    const companyId = req.company?.id;

    const track = await this.prisma.tracks.findUnique({
      where: {
        id: deleteTrackDto.id,
      },
      include: {
        companyId: true,
        images: true,
      },
    });

    if (track.company.id !== companyId) {
      throw Error("Only Company owner can delete track!");
    }

    // Manually delete the related images
    await this.prisma.images.deleteMany({
      where: {
        trackId: deleteTrackDto.id,
      },
    });

    await this.prisma.tracks.delete({
      where: {
        id: deleteTrackDto.id,
      },
    });

    return { message: "Track Deleted successfully!" };
  }
}
