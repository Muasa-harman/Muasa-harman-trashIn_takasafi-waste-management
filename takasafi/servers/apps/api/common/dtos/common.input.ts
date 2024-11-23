import {ArgsType,Field,Float,InputType,ObjectType,registerEnumType} from "@nestjs/graphql"
import { Prisma } from "@prisma/client"

export type RestrictProperties<T,U> = {
    [K in Keyof T]: K extends keyof U ? T[K] : never
} & Required<U>

// implement prisma.DateTimeFilter
@InputType()
export class DateTimeFilter{
    equals?: string;
    in?:string[]
    notIn?:string[]
    lt?:string
    lte?:string
    gt?:string
    gte?:string
}

registerEnumType(Prisma.QueryMode,{
    name: 'QueryModel',
})

// implement required<prisma.StringFilter>
@InputType()
export class StringFilter{
    equals?:string;
    in?:string[]
    notIn:?string[]
    lt?:string
    lte?:string
    gt?:string
    gte?:string
    contains?:string
    startsWith?:string
    endsWith?:string
    not?:string
    @Field(()=>Prisma.QueryMode)
    mode?:Prisma.QueryMode
}

@InputType()
export class StringListFilter{
    equals?:string[]
    has?:string
    hasEvery?:string[]
    hasSome?:string[]
    isEmpty?:boolean
}

@InputType()
export class BoolFilter{
    equals?:number
    lt?:number
    lte?:number
    gt?:number
    gte?:number
}

@InputType()
export class IntFilter{
    equals?:number
    lt?:number
    lte?:number
    gt?:number
    gte?:number
}

@InputType()
export class FloatFilter{
    equals?:number
    lt?:number
    lte?:number
    gt:? number
    gte:?number
    not:?number
}

registerEnumType(Prisma.SortOrder, {
    name: 'SortOrder',
})

@ObjectType()
export class AggregateCountOutput{
    count: number
}

@InputType()
export class LocationFilterInput{
    @Field(()=>Float)
    ne_lat: number

    @Field(()=>Float)
    sw_lat: number

    @Field(()=>Float)
    sw_lng: number
}

@ArgsType()
export class PaginationInput{
    take?:number
    skip?:number
}