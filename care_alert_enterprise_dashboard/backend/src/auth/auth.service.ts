import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async login(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true }
    });

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect.');
    }

    if (user.status === 'DISABLED') {
      throw new UnauthorizedException('Your account has been disabled.');
    }

    const isPasswordValid = await argon2.verify(user.password_hash, pass);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email or password is incorrect.');
    }

    const payload = { sub: user.id, email: user.email, role: user.role.name };
    const accessToken = await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET });

    // Store session/refresh token logic would go here

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
      }
    };
  }
}
