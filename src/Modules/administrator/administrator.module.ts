import { Module } from '@nestjs/common';
import { AdministratorService } from '../../Services/administrator/administrator.service';
import { AdministratorController } from '../../Controllers/administrator/administrator.controller';
import {administratorProviders} from "../../Providers/administrator.providers";

@Module({
  controllers: [AdministratorController],
  providers: [AdministratorService,
    ...administratorProviders
  ]
})
export class AdministratorModule {}
