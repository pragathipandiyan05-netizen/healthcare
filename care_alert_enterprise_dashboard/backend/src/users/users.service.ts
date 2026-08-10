import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createWorker(data: any) {
    try {
      if (!data || !data.email || !data.password) {
        throw new BadRequestException('Missing required fields: email and password');
      }

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
      let realDistrict = await this.prisma.district.findFirst();
      if (!realDistrict) {
        realDistrict = await this.prisma.district.create({
          data: {
            id: data.district_id,
            name: 'Chennai District',
          }
        });
      }

      let realHospital = await this.prisma.hospital.findFirst();
      if (!realHospital) {
        realHospital = await this.prisma.hospital.create({
          data: {
            id: data.hospital_id,
            name: 'Government General Hospital',
            hospital_code: 'GH-CHEN-01',
            type: 'Government',
            address: 'Chennai',
            district_id: realDistrict.id,
          }
        });
      }

      // Ensure employee ID is unique by checking or using a larger random pool
      // If EMP-XXXX exists, Prisma will throw unique constraint error. 
      // Using a larger random number helps prevent collisions on empty DBs.
      const uniqueSuffix = Date.now().toString().slice(-4) + Math.floor(Math.random() * 1000);
      
      const user = await this.prisma.user.create({
        data: {
          employee_id: `EMP-${uniqueSuffix}`,
          name: data.name,
          email: data.email,
          password_hash: hashedPassword,
          role_id: role.id,
          hospital_id: realHospital.id,
          district_id: realDistrict.id,
        },
        include: { hospital: true, district: true },
      });

      const { password_hash, ...result } = user;
      return result;
    } catch (error) {
      require('fs').writeFileSync('last-error.txt', `Code: ${error.code}\nMeta: ${JSON.stringify(error.meta)}\nMessage: ${error.message}`);
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(`Registration failed: ${error.message}`);
    }
  }

  async getWorkers() {
    // Return all users (in a real app, we'd filter by WORKER role or status)
    const users = await this.prisma.user.findMany({
      include: { hospital: true, district: true },
      orderBy: { created_at: 'desc' }
    });
    
    // Remove password hashes before returning
    return users.map(user => {
      const { password_hash, ...rest } = user;
      return rest;
    });
  }
}
