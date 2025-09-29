import { ConfigModule } from '@nestjs/config'

export const ConfigModuleRoot = ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
})
