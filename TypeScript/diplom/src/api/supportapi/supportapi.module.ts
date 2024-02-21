import { Module } from '@nestjs/common';
import { SupportRequestApiController } from './supportapi.controller';
import { SupportRequestModule } from 'src/base/support/support.module';

@Module({
  imports: [SupportRequestModule],
  providers: [],
  controllers: [SupportRequestApiController],
})
export class SupportRequestApiModule {}
