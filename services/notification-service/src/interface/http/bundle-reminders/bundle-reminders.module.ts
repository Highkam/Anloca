import { Module } from '@nestjs/common';
import { BundleReminderController } from './bundle-reminder.controller';
import { CreateBundleReminderUseCase } from '../../../core/bundle-reminders/application/usecases/create-bundle-reminder.usecase';
import { UpdateBundleReminderUseCase } from '../../../core/bundle-reminders/application/usecases/update-bundle-reminder.usecase';
import { DeleteBundleReminderUseCase } from '../../../core/bundle-reminders/application/usecases/delete-bundle-reminder.usecase';
import { GetBundleRemindersByUserUseCase } from '../../../core/bundle-reminders/application/usecases/get-bundle-reminders-by-user.usecase';
import { BundleReminderRepository } from '../../../infrastructure/repositories/bundle-reminder.repository';
import { BUNDLE_REMINDER_REPOSITORY } from '../../../core/bundle-reminders/application/tokens';
import { PrismaModule } from '../../../infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BundleReminderController],
  providers: [
    CreateBundleReminderUseCase,
    UpdateBundleReminderUseCase,
    DeleteBundleReminderUseCase,
    GetBundleRemindersByUserUseCase,
    BundleReminderRepository,
    { provide: BUNDLE_REMINDER_REPOSITORY, useClass: BundleReminderRepository },
  ],
  exports: [],
})
export class BundleRemindersModule {}
