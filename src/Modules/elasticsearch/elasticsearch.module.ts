import { Module } from '@nestjs/common';
import { ElasticsearchModule as NestElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        NestElasticsearchModule.registerAsync({
            imports: [ConfigModule.forRoot({ isGlobal: true })],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                node: 'http://elasticsearch:9200', // Use the service name 'elasticsearch' here
            }),
        }),
    ],
    exports: [NestElasticsearchModule],
})
export class ElasticsearchModule {}
