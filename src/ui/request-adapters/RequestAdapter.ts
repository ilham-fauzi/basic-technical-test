import * as Joi from '@hapi/joi';
import { BadRequestException } from '@nestjs/common';

const defaultOptions: object = {
    stripUnknown: {
        arrays: false,
        objects: true,
    },
    abortEarly: false,
};

export class RequestAdapter {
    public async validate(payload: object, schema: Joi.ObjectSchema, options: object = defaultOptions) {
        const scheme: Joi.ObjectSchema = schema;

        return await Joi.validate(payload, scheme, options)
            .catch((err: any) => {
                const details = err.details.reduce((detail: any, item: any) => {
                    detail[item.context.key] = item.message.replace(/"/g, '');
                    return detail;
                }, {});
                throw new BadRequestException(details);
            });
    }
}
