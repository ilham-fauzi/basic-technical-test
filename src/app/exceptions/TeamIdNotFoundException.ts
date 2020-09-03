import { NotFoundException } from '@nestjs/common';

export class TeamIdNotFoundException extends NotFoundException {
    constructor(id?: number) {
        super(`Team ID : ${id} Not Found`);
    }
}
