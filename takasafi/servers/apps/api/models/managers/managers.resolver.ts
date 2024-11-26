import {
    Resolver,
    Query,
    Mutation,
    Args,
    ResolveField,
    Parent,
  } from '@nestjs/graphql'
  import { ManagersService } from './managers.service'
  import { Manager } from './entity/manager.entity'
import { CreateManagerInput } from './dto/create-manager.input'
import { PrismaService } from 'common/prisma/prisma.service'
import { AllowAuthenticated, GetUser } from 'common/auth/auth.decorator'
import { GetUserType } from 'common/types'
import { checkRowLevelPermission } from 'common/auth/util'
import { FindManyManagerArgs, FindUniqueManagerArgs } from './dto/find.args'
import { UpdateManagerInput } from './dto/update-manager.input'

  
  @Resolver(() => Manager)
  export class ManagersResolver {
    constructor(
      private readonly managersService: ManagersService,
      private readonly prisma: PrismaService,
    ) {}
  
    @AllowAuthenticated()
    @Mutation(() => Manager)
    createManager(
      @Args('createManagerInput') args: CreateManagerInput,
      @GetUser() user: GetUserType,
    ) {
      checkRowLevelPermission(user, args.uid)
      return this.managersService.create(args)
    }
  
    @Query(() => [Manager], { name: 'managers' })
    findAll(@Args() args: FindManyManagerArgs) {
      return this.managersService.findAll(args)
    }
  
    @Query(() => Manager, { name: 'manager' })
    findOne(@Args() args: FindUniqueManagerArgs) {
      return this.managersService.findOne(args)
    }
  
    @AllowAuthenticated()
    @Mutation(() => Manager)
    async updateManager(
      @Args('updateManagerInput') args: UpdateManagerInput,
      @GetUser() user: GetUserType,
    ) {
      const manager = await this.prisma.manager.findUnique({
        where: { uid: args.uid },
      })
      checkRowLevelPermission(user, manager.uid)
      return this.managersService.update(args)
    }
  
    @AllowAuthenticated()
    @Mutation(() => Manager)
    async removeManager(
      @Args() args: FindUniqueManagerArgs,
      @GetUser() user: GetUserType,
    ) {
      const manager = await this.prisma.manager.findUnique(args)
      checkRowLevelPermission(user, manager.uid)
      return this.managersService.remove(args)
    }
  
    @ResolveField(() => Company, { nullable: true })
    company(@Parent() manager: Manager) {
      return this.prisma.company.findUnique({ where: { id: manager.companyId } })
    }
  }
  