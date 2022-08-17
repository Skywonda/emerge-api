import { flatten, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HelperService } from './helper.service';

@Module({
    imports: [ConfigModule, JwtModule.registerAsync({
        useFactory: () => ({
            signOptions: {
                algorithm: 'HS256'
            },
            verifyOptions: {
                algorithms: ['HS256'],
            }
        })
    })],
    providers: [HelperService],
    exports: [HelperService]
})
export class HelperModule { }