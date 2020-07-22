import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'oracle',
    connectString:'dlesfvmdb01.nonprod.avaya.com:1526/esfdev',
    host: 'dlesfvmdb01.nonprod.avaya.com',
    port: 1526,
    username: 'aes',
    password: 'Wol#1ErsIpY#UF$dLzfk6miDSds_27',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
};