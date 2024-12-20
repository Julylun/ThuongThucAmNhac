import { Injectable } from '@nestjs/common';
var bcrypt = require('bcryptjs')

@Injectable()
export class HashService {
    async encrypt(data: string, saltRound: number = 10): Promise<string> {
        return await bcrypt.hash(data, saltRound);
    }
}
