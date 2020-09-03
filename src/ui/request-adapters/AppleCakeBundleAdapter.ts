import { RequestInterface } from '../../ui/types/CommonType';
import { RequestAdapter } from './RequestAdapter';
import { RequestAdapterInterface } from './RequestAdapterInterface';
import * as Joi from '@hapi/joi';
import { AppleCakeBundleCommand } from '../../app/command/AppleCakeBundleCommand';

export class AppleCakeBundleAdapter extends RequestAdapter implements RequestAdapterInterface {
    async getCommandQuery(data: RequestInterface): Promise<AppleCakeBundleCommand> {
        await this.validate(data, this.getScheme());
        return new AppleCakeBundleCommand(data.body.apple, data.body.cake);
    }
    getScheme(): Joi.ObjectSchema {
        return Joi.object({
            body: Joi.object({
                apple: Joi.number().required(),
                cake: Joi.number().required(),
            }),
        });
    }
}
