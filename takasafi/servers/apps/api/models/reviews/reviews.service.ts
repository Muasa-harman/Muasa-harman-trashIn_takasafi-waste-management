import { Injectable } from '@nestjs/common'
import { PrismaService } from 'common/prisma/prisma.service'
import { CreateReviewInput } from './dto/create-review.input'
import { FindManyReviewArgs, FindUniqueReviewArgs } from './dto/find.args'
import { UpdateReviewInput } from './dto/update-review.input'

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createReviewInput: CreateReviewInput) {
    return this.prisma.review.create({
      data: createReviewInput,
    })
  }

  findAll(args: FindManyReviewArgs) {
    return this.prisma.review.findMany(args)
  }

  findOne(args: FindUniqueReviewArgs) {
    return this.prisma.review.findUnique(args)
  }

  update(updateReviewInput: UpdateReviewInput) {
    const { id, ...data } = updateReviewInput
    return this.prisma.review.update({
      where: { id },
      data: data,
    })
  }

  remove(args: FindUniqueReviewArgs) {
    return this.prisma.review.delete(args)
  }
}
