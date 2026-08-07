import { Module } from '@nestjs/common';
import { SosService } from './sos.service';
import { SosController } from './sos.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { SosGateway } from './sos.gateway';

@Module({
  imports: [PrismaModule],
  providers: [SosService, SosGateway],
  controllers: [SosController]
})
export class SosModule {}
