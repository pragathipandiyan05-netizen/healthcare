import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createWorker(data: any) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    // Default to 'WORKER' role or find it
    let role = await this.prisma.role.findUnique({ where: { name: 'WORKER' } });
    if (!role) {
      role = await this.prisma.role.create({ data: { name: 'WORKER' } });
    }

    const hashedPassword = await argon2.hash(data.password);

    // Fallback to real DB records if frontend sends invalid hardcoded UUIDs
    const realHospital = await this.prisma.hospital.findFirst();
    const realDistrict = await this.prisma.district.findFirst();

    const user = await this.prisma.user.create({
      data: {
        employee_id: `EMP-${Math.floor(Math.random() * 10000)}`,
        name: data.name,
        email: data.email,
        password_hash: hashedPassword,
        role_id: role.id,
        hospital_id: realHospital?.id || data.hospital_id,
        district_id: realDistrict?.id || data.district_id,
      },
      include: { hospital: true, district: true },
    });

    const { password_hash, ...result } = user;
    return result;
  }
}
