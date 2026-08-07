import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SosGateway } from './sos.gateway';

@Injectable()
export class SosService {
  constructor(
    private prisma: PrismaService,
    private sosGateway: SosGateway,
  ) {}

  async createSosAlert(data: {
    worker_id: string;
    hospital_id: string;
    district_id: string;
    department_id?: string;
    latitude?: number;
    longitude?: number;
  }) {
    const alert = await this.prisma.sosAlert.create({
      data: {
        worker_id: data.worker_id,
        hospital_id: data.hospital_id,
        district_id: data.district_id,
        department_id: data.department_id,
        latitude: data.latitude,
        longitude: data.longitude,
        status: 'ACTIVE',
        priority: 'CRITICAL',
      },
      include: {
        worker: true,
        hospital: true,
        district: true,
        department: true,
      },
    });

    await this.prisma.alertEvent.create({
      data: {
        sos_alert_id: alert.id,
        event_type: 'CREATED',
        details: 'SOS triggered by staff',
      },
    });

    // Emit real-time WebSocket event
    this.sosGateway.notifyNewSosAlert(alert);

    return alert;
  }

  async acknowledgeSosAlert(id: string, adminId: string) {
    const alert = await this.prisma.sosAlert.update({
      where: { id },
      data: {
        status: 'ACKNOWLEDGED',
        acknowledged_at: new Date(),
        acknowledged_by: adminId,
      },
      include: {
        worker: true,
        hospital: true,
      },
    });

    await this.prisma.alertEvent.create({
      data: {
        sos_alert_id: alert.id,
        event_type: 'ACKNOWLEDGED',
        details: 'SOS acknowledged by admin',
      },
    });

    // Emit real-time WebSocket event
    this.sosGateway.notifySosAcknowledged(alert);

    return alert;
  }

  async assignSosAlert(id: string, adminId: string, assignedToId: string) {
    const alert = await this.prisma.sosAlert.update({
      where: { id },
      data: {
        status: 'ASSIGNED',
        assigned_at: new Date(),
        assigned_to: assignedToId,
      },
      include: {
        worker: true,
        hospital: true,
        assigned_user: true,
      },
    });

    await this.prisma.alertEvent.create({
      data: {
        sos_alert_id: alert.id,
        event_type: 'ASSIGNED',
        details: `SOS assigned to ${alert.assigned_user?.name || assignedToId} by admin`,
      },
    });

    this.sosGateway.notifySosAssigned(alert);
    return alert;
  }

  async resolveSosAlert(id: string, adminId: string) {
    const alert = await this.prisma.sosAlert.update({
      where: { id },
      data: {
        status: 'RESOLVED',
        resolved_at: new Date(),
        resolved_by: adminId,
      },
      include: {
        worker: true,
        hospital: true,
      },
    });

    await this.prisma.alertEvent.create({
      data: {
        sos_alert_id: alert.id,
        event_type: 'RESOLVED',
        details: 'SOS resolved by admin',
      },
    });

    this.sosGateway.notifySosResolved(alert);
    return alert;
  }

  async escalateSosAlert(id: string, adminId: string) {
    const alert = await this.prisma.sosAlert.update({
      where: { id },
      data: {
        status: 'ESCALATED',
      },
      include: {
        worker: true,
        hospital: true,
      },
    });

    await this.prisma.alertEvent.create({
      data: {
        sos_alert_id: alert.id,
        event_type: 'ESCALATED',
        details: 'SOS escalated by admin',
      },
    });

    this.sosGateway.notifySosEscalated(alert);
    return alert;
  }

  async findAll() {
    return this.prisma.sosAlert.findMany({
      orderBy: { triggered_at: 'desc' },
      include: {
        worker: true,
        hospital: true,
        district: true,
        department: true,
      },
    });
  }

  async findOne(id: string) {
    const alert = await this.prisma.sosAlert.findUnique({
      where: { id },
      include: {
        worker: true,
        hospital: true,
        district: true,
        department: true,
        events: {
          orderBy: { created_at: 'asc' },
        },
        ack_user: true,
        assigned_user: true,
        res_user: true,
      },
    });

    if (!alert) {
      throw new NotFoundException(`SOS Alert with ID ${id} not found`);
    }

    return alert;
  }
}
