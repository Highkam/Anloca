import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'Service is running' })
  getHello(): { message: string; timestamp: string } {
    return {
      message: 'Catalog Service is running!',
      timestamp: new Date().toISOString(),
    };
  }
}