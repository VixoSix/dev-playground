import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/signin.input';
import { PrismaService } from '../prisma/prisma.service';
import { verify } from 'argon2';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService){}
    async validateLocalUser({email, password}:SignInInput){
        const user = await this.prisma.user.findUnique({
            where: {
                email
            },
        });

        if (!user) throw new UnauthorizedException('User Not Found');

        if (!user.password) {
            throw new UnauthorizedException('Invalid Credentials!');
        }

        const passwordMatched = await verify(user.password, password);

        if (!passwordMatched) throw new UnauthorizedException("Invalid Credentials!");

        return user;
    }

    async generateToken(userId: number){
        const payload: AuthJwtPayload = { sub: userId };
        const accessToken = await this.jwtService.signAsync(payload);
        return { accessToken };
    }

    async login(user: User){
        const {accessToken} = await this.generateToken(user.id);
        return {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            accessToken
        };
    }
}
