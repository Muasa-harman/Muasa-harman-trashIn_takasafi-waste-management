import {JwtService} from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { Role } from '../types'
import { PrismaService } from '../prisma/prisma.service'
import { Injectable,CanActivate,ExecutionContext,UnauthorizedException } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
        private readonly prisma: PrismaService,
    ){}
    async canActivate(context: ExecutionContext):Promise<boolean>{
        const ctx = GqlExecutionContext.create(context)
        const req = ctx.getContext().req

        await this.authenticateUser(req)
        return this.authorizeUser(req,context)
    }
    private async authenticateUser(req: any):Promise<void>{
        const bearerHeader = req.headers.authorization
        // bearer
        const token = bearerHeader?.split(' ')[1]

        if(!token){
            throw new UnauthorizedException('no token provided')
        }
        try {
            const payload = await this.jwtService.verify(token)
            const uid = payload.uid
            if(!uid){
                throw new UnauthorizedException(
                    'Invalid token. No uid present in the token.',
                )
            }
            const user = await this.prisma.user.findUnique({where: { uid }})
            if(!user){
                throw new UnauthorizedException(
                    'Invalid token. No user present with the uid.'
                )
            }
            console.log('jwt payload:', payload)
            req.user = payload
        } catch (error) {
            console.error('Token validation error', error)
            throw error
        }
        if(!req.user){
            throw new UnauthorizedException('Invalid token.')
        }
    }
    private async authorizeUser(
        req: any,
        context: ExecutionContext,
    ): Promise<boolean>{
        const requiredRoles = this.getMetadata<Role[]>('role', context)
        const userRoles = await this.getUserRoles(req.user.uid)
        req.user.roles = userRoles

        if(!requiredRoles || requiredRoles.length === 0){
            return true
        }
        return requiredRoles.some((role)=> userRoles.includes(role))
    }
    private getMetadata<T>(key: string,context:ExecutionContext): T{
        return this.reflector.getAllAndOverride<T>(key, [
            context.getHandler(),
            context.getClass(),
        ])
    }

    private async getUserRoles(uid: string):Promise<Role[]>{
        const roles: Role[] = []

        const [admin,manager,driver] = await Promise.all([
            this.prisma.admin.findUnique({where:{uid}}),
            this.prisma.manager.findUnique({where:{uid}}),
            this.prisma.driver.findUnique({where: {uid}})
        ])
        admin && roles.push('admin')
        manager && roles.push('manager')
        driver && roles.push('driver')
        
        return roles
    }
}