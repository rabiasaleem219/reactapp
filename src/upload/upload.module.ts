import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { S3Module } from 'nestjs-s3';

@Global()
@Module({
  imports: [
    S3Module.forRoot({
      config: {
        accessKeyId: 'DO00PHVA8CNF77PAWND4',
        secretAccessKey: 'ZcIa9cefY/kSgw+Pdhdw/NG6hvcmW8VQ5EwoGylUoVc',
        endpoint: 'fra1.digitaloceanspaces.com',
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
      },
    }),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [],
})
export class UploadModule {}
