import { Module } from '@nestjs/common';
import { ElasticsearchModule as NestElasticsearchModule } from '@nestjs/elasticsearch';
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        NestElasticsearchModule.registerAsync({
            imports: [ConfigModule.forRoot({isGlobal: true})],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                node: 'https://elasticsearch-gqbn.onrender.com:9200',
            }),
        }),
    ],
    exports: [NestElasticsearchModule],
})
export class ElasticsearchModule {}
