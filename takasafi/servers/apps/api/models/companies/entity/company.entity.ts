import { Field,ObjectType } from "@nestjs/graphql";
import { Company as CompanyType } from "@prisma/client";
import { RestrictProperties } from "common/dtos/common.input";

@ObjectType()
export class Company implements RestrictProperties<Company, CompanyType>{
    id: number
    createdAt:Date
    updatedAt:Date
    @Field({nullable: true})
    displayName: string
    @Field({nullable: true})
    description: string
}