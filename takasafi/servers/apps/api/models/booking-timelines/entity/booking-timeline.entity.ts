import { Field,ObjectType } from "@nestjs/graphql";
import { $Enums,BookingTimeline as BookingTimelineType } from "@prisma/client";
import { RestrictProperties } from "../../../common/dtos/common.input";
@ObjectType()
export class BookingTimeline implements RestrictProperties<BookingTimeline,BookingTimelineType>{
    id: number
    timestamp:Date
    @Field(()=>$Enums.BookingStatus)
    status:$Enums.BookingStatus
    bookingId: number
    @Field({nullable: true})
    driverId: string
    @Field({nullable: true})
    managerId: string
}