import { BadRequestException } from '@nestjs/common';

export class TeamNameBadRequestException extends BadRequestException {
    constructor(name?: string) {
        super(`Team name : ${name} ALready exist`);
    }
}
