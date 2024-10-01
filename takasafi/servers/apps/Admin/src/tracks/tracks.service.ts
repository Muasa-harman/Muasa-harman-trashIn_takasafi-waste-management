import { PrismaService } from "apps/companies/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "../email/email.service";
import { CreateTrackDto, DeleteTrackDto } from "./dto/tracks.dto";
import { Response } from "express";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { error } from "console";

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
      const { name, number_plate,driver,mobile, price, category, images,route,description } =
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
   async getAllOrders(req:any,res:Response){}
 
    // delete tracks
    async deleteTracks(req:any,res:Response){
      try {
        const trackId = req.track?.id;

        if(!trackId){
          return res.status(400).json({error: 'Track ID is required'})
        }
        
      } catch (error) {
        
      }

      const track = await this.prisma.tracks.delete({
        where: {id: trackId}
      });
      return res.status(200).json({message: 'Track deleted successfully', track});
    } catch (error){
      console.error(error);
      return res.status(500).json({error: 'An error occured while deleting the track'});
    }
 

  // get all company trucks
  async getLoggedInCompanyTrack(req: any, res: Response) {
    const companyId = req.company?.id;

    const tracks = await this.prisma.tracks.findMany({
      where: {
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
    return { tracks };
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
