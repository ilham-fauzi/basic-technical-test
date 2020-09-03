import { TeamCommand } from '../../app/command/TeamCommand';
import { RequestInterface } from '../types/CommonType';
import { RequestAdapter } from './RequestAdapter';
import { RequestAdapterInterface } from './RequestAdapterInterface';
import * as Joi from '@hapi/joi';

export class InsertTeamRequestAdapter extends RequestAdapter implements RequestAdapterInterface {
    getScheme(): Joi.ObjectSchema {
        return Joi.object({
            body: Joi.object({
                name: Joi.string().max(100).required(),
            }),
        });
    }
    async getCommandQuery(data: RequestInterface): Promise<TeamCommand> {
        await this.validate(data, this.getScheme());
        return new TeamCommand(data.body.name);
    }

}
