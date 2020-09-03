import { PlayerCommand } from '../../app/command/PlayerCommand';
import { RequestInterface } from '../types/CommonType';
import { RequestAdapter } from './RequestAdapter';
import { RequestAdapterInterface } from './RequestAdapterInterface';
import * as Joi from '@hapi/joi';

export class InsertPlayerRequestAdapter extends RequestAdapter implements RequestAdapterInterface {
    getScheme(): Joi.ObjectSchema {
        return Joi.object({
            body: Joi.object({
                name: Joi.string().max(150).required(),
                back_number: Joi.number().required(),
                team_id: Joi.number().required(),
            }),
        });
    }

    async getCommandQuery(data: RequestInterface): Promise<PlayerCommand> {
        await this.validate(data, this.getScheme());
        return new PlayerCommand(data.body.name, data.body.back_number, data.body.team_id);
    }
}
