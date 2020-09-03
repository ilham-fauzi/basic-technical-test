import { BadRequestException } from '@nestjs/common';

export class AppleCakeBundleBadrequest extends BadRequestException {
    constructor() {
        super('Apple and Cake should be number');
    }
}
