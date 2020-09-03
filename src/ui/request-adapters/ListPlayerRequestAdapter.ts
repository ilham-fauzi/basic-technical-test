import { RequestInterface } from 'ui/types/CommonType';
import { RequestAdapter } from './RequestAdapter';
import { RequestAdapterInterface } from './RequestAdapterInterface';
import * as Joi from '@hapi/joi';
import { PlayerListQuery } from '../../app/query/PlayerListQuery';

export class ListPlayerRequestAdapter extends RequestAdapter implements RequestAdapterInterface {
    async getCommandQuery(data: RequestInterface): Promise<PlayerListQuery> {
        await this.validate(data, this.getScheme());
        return new PlayerListQuery(data.query.page, data.query.per_page);
    }

    getScheme(): Joi.ObjectSchema {
        return Joi.object({
            query: Joi.object({
                page: Joi.number().required().default(0),
                per_page: Joi.number().required().default(10),
            }),
        });
    }

}
