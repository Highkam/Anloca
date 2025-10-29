import { applyDecorators, UseGuards } from '@nestjs/common';
import { SessionRequiredGuard } from '../guards/session-required.guard';

export function sessionRequired() {
  return applyDecorators(UseGuards(SessionRequiredGuard));
}
