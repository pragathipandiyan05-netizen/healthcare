import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('worker')
  createWorker(@Body() createWorkerDto: any) {
    console.log('RECEIVED DATA:', createWorkerDto);
    return this.usersService.createWorker(createWorkerDto);
  }

  @Get('workers')
  getWorkers() {
    return this.usersService.getWorkers();
  }
}
