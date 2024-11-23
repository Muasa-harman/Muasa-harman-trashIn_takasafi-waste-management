import { ArgsType,Field,registerEnumType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { CompanyWhereInput,CompanyWhereUniqueInput } from "./where.args";
import { CompanyOrderByWithRelationInput } from "./order-by.args";

registerEnumType(Prisma.CompanyScalarFieldEnum,{
    name:'CompanyScalarFieldEnum',
})
import { RestrictProperties } from "common/dtos/common.input";

@ArgsType()
class FindManyCompanyArgsStrict 
implements RestrictProperties
<FindManyCompanyArgsStrict,Omit<Prisma.CompanyFindManyArgs,'include' | 'select'>>
{
    where: CompanyWhereInput
    orderBy:CompanyOrderByWithRelationInput[]
    cursor:CompanyWhereUniqueInput
    take:number
    skip:number
    @Field(()=>[Prisma.CompanyScalarFieldEnum])
    distinct: Prisma.CompanyScalarFieldEnum[]
}

@ArgsType()
export class FindManyUserArgs extends PartialType(
    FindManyCompanyArgsStrict,
){}

@ArgsType()
export class FindUniqueCompanyArgs{
    where: CompanyWhereUniqueInput
}