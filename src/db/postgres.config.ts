import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: this.configService.get<string>('POSTGRES_HOST'),
      port: this.configService.get<number>('POSTGRES_PORT'),
      username: this.configService.get<string>('POSTGRES_NAME'),
      password: this.configService.get<string>('POSTGRES_PASS'),
      database: this.configService.get<string>('POSTGRES_DB'),
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
