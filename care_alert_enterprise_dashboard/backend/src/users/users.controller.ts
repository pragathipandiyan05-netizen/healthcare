import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('worker')
  createWorker(@Body() createWorkerDto: any) {
    return this.usersService.createWorker(createWorkerDto);
  }
}
