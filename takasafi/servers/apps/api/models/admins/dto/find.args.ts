import { ArgsType,Field,registerEnumType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { RestrictProperties } from "common/dtos/common.input";
import { AdminWhereInput,AdminWhereUniqueInput } from "./where.args";
import { AdminOrderByWithRelationInput } from "./order-by.args";

registerEnumType(Prisma.AdminScalarFieldEnum, {
    name:'AdminScalarFieldEnum',
})

@ArgsType()
class FindManyAdminArgsStrict implements RestrictProperties<FindManyAdminArgsStrict,Omit<Prisma.AdminFindManyArgs, 'include' | 'select'>>{
    where:AdminWhereInput
    orderBy:AdminOrderByWithRelationInput[]
    cursor:AdminWhereUniqueInput
    take:number
    skip:number
    @Field(()=>[Prisma.AdminScalarFieldEnum])
    distinct:Prisma.AdminScalarFieldEnum[]
}
@ArgsType()
export class FindManyAdminArgs extends PartialType(FindManyAdminArgsStrict){}

@ArgsType()
export class FindUniqueAdminArgs{
    where:AdminWhereUniqueInput
}