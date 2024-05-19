import { Module } from '@nestjs/common';
import {BusinessModule} from "./business/business.module";
import {ConfigModule} from "./config/config.module";
import {ControllerModule} from "./controller/controller.module";
import {EntityModule} from "./entity/entity.module";
import {RepositoryModule} from "./repository/repository.module";



@Module({
    imports: [
        ConfigModule,
        EntityModule,
        RepositoryModule,
        BusinessModule,
        ControllerModule,
    ]
})
export class AppModule {}
