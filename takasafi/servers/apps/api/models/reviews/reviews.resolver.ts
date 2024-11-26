import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ReviewsService } from './reviews.service'
import { PrismaService } from 'common/prisma/prisma.service'
import { Review } from './entity/review.entity'
import { AllowAuthenticated, GetUser } from 'common/auth/auth.decorator'
import { CreateReviewInput } from './dto/create-review.input'
import { GetUserType } from 'common/types'
import { checkRowLevelPermission } from 'common/auth/util'
import { FindManyReviewArgs, FindUniqueReviewArgs } from './dto/find.args'
import { UpdateReviewInput } from './dto/update-review.input'

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Review)
  createReview(
    @Args('createReviewInput') args: CreateReviewInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.customerId)
    return this.reviewsService.create(args)
  }

  @Query(() => [Review], { name: 'reviews' })
  findAll(@Args() args: FindManyReviewArgs) {
    return this.reviewsService.findAll(args)
  }

  @Query(() => Review, { name: 'review' })
  findOne(@Args() args: FindUniqueReviewArgs) {
    return this.reviewsService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Review)
  async updateReview(
    @Args('updateReviewInput') args: UpdateReviewInput,
    @GetUser() user: GetUserType,
  ) {
    const review = await this.prisma.review.findUnique({
      where: { id: args.id },
    })
    checkRowLevelPermission(user, review.customerId)
    return this.reviewsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Review)
  async removeReview(
    @Args() args: FindUniqueReviewArgs,
    @GetUser() user: GetUserType,
  ) {
    const review = await this.prisma.review.findUnique(args)
    checkRowLevelPermission(user, review.customerId)
    return this.reviewsService.remove(args)
  }
}
