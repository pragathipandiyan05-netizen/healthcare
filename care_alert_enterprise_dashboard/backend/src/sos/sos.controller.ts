import { Controller, Post, Body, Param, Patch, UseGuards, Req, Get } from '@nestjs/common';
import { SosService } from './sos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('api/v1/sos')
export class SosController {
  constructor(private readonly sosService: SosService) {}

  // @UseGuards(JwtAuthGuard) // Temporarily disabled for testing
  @Post()
  async createSosAlert(@Body() body: any) {
    return this.sosService.createSosAlert(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'STATE_ADMIN', 'DISTRICT_ADMIN', 'HOSPITAL_ADMIN', 'SECURITY_ADMIN')
  @Patch(':id/acknowledge')
  async acknowledgeSosAlert(@Param('id') id: string, @Req() req: any) {
    return this.sosService.acknowledgeSosAlert(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'STATE_ADMIN', 'DISTRICT_ADMIN', 'HOSPITAL_ADMIN', 'SECURITY_ADMIN')
  @Patch(':id/assign')
  async assignSosAlert(@Param('id') id: string, @Body('assigned_to') assignedTo: string, @Req() req: any) {
    return this.sosService.assignSosAlert(id, req.user.userId, assignedTo);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'STATE_ADMIN', 'DISTRICT_ADMIN', 'HOSPITAL_ADMIN', 'SECURITY_ADMIN')
  @Patch(':id/resolve')
  async resolveSosAlert(@Param('id') id: string, @Req() req: any) {
    return this.sosService.resolveSosAlert(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'STATE_ADMIN', 'DISTRICT_ADMIN', 'HOSPITAL_ADMIN', 'SECURITY_ADMIN')
  @Patch(':id/escalate')
  async escalateSosAlert(@Param('id') id: string, @Req() req: any) {
    return this.sosService.escalateSosAlert(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'STATE_ADMIN', 'DISTRICT_ADMIN', 'HOSPITAL_ADMIN', 'SECURITY_ADMIN')
  @Get()
  async findAll() {
    return this.sosService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'STATE_ADMIN', 'DISTRICT_ADMIN', 'HOSPITAL_ADMIN', 'SECURITY_ADMIN')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sosService.findOne(id);
  }
}
