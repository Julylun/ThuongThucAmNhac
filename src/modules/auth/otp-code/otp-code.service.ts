import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { _Number } from 'src/common/function.global';
import { Repository } from 'typeorm';
import { OtpCode } from './entity/otp-code.entity';
import { PersonService } from 'src/modules/person/person.service';

@Injectable()
export class OtpCodeService {
    constructor(
        @InjectRepository(OtpCode) private readonly otpCodeRepository: Repository<OtpCode>,
        private readonly jwtService: JwtService,
        private readonly personService: PersonService
    ) { }
    private logger: Logger = new Logger(OtpCodeService.name);


    /**
     * Verify and parse otpTokenJwt (otp code token) into payload.
     * {secureCode, personId} -
     * @param otpToken
     * @returns {{secureCode, personId}} - 
     */
    otpCodeTokenToPayLoad(otpToken: string) {
        try {
            let payload = this.jwtService.verify(otpToken);
            return payload;
        } catch(error) {
            this.logger.error('[otpCodeTokenToPayload]: An error occured while get');
            return null;
        }
    }

    async isOtpValid(otpToken: string) {
        try {
            let payload = this.jwtService.verify(otpToken);

            let personId = payload.personid;
            let userAccount = this.personService.getPerson(personId);
            if(!userAccount) throw new Error('User account doesnt exist in the database.');

            let otpCodeInstance = await this.otpCodeRepository.findOneBy({
                person: {personId: personId},
                otpCodeToken: otpToken
            })
            if(!otpCodeInstance) throw new Error("OtpToken doesnt exist in the database");

            return true;
        } catch (error) {
            this.logger.error('[isOtpValid]: An error occured while verifying otp token');
            this.logger.error(error);
            return null;
        }
    }
    
    /**
     * Generate otp code an save it into database
     * @param personId number 
     * @returns number (-1 if failed while generating, secure code if generate successfully)
     */
    async generateOtpCode(personId: number) {
        try {
            let generatedSecureCode = _Number.generateRandomNumberByDigits(5);

            const payload = { secureCode: generatedSecureCode, personId: personId }
            let secureToken = this.jwtService.sign(payload);
            let otpCodeObj = await this.otpCodeRepository.create({
                person: { personId: personId },
                otpCodeToken: secureToken
            });

            let saveStatus = await this.otpCodeRepository.save(otpCodeObj);
            if(!saveStatus) throw new Error('An error occured while saving secure code object');
            return {secureCode: generatedSecureCode, otpCodeToken: secureToken};
        } catch (error) {
            this.logger.error(error);
            return -1;
        }
    }
}
