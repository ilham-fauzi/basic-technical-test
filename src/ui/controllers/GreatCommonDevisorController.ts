import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBody } from '@nestjs/swagger';
import { GCDDTO } from 'ui/types/models/dataDTO';
import { AppleCakeBundleAdapter } from '../../ui/request-adapters/AppleCakeBundleAdapter';
import { ResponseInterface } from '../../ui/types/CommonType';

@Controller('/gcd')
export class GreatCommonDevisorController {
    constructor(
        private readonly commandBus: CommandBus,
    ) {}

    @Post('/apple-cake-bundle')
    @ApiBody({ type: GCDDTO})
    async boxBundle(@Body() body): Promise<ResponseInterface> {
        const adapter = new AppleCakeBundleAdapter();
        const command = await adapter.getCommandQuery({ body });
        const result = await this.commandBus.execute(command);
        return {
            message: 'BOX_BUNDLE_RESULTS',
            status: HttpStatus.OK,
            content: {
                box: result.box,
                cake: result.cake,
                apple: result.apple,
            },
        };
    }
}
