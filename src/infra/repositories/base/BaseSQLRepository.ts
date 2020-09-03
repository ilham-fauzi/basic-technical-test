import { NotImplementedException } from '@nestjs/common';
import { PaginationHelperInfra } from '../../../infra/helpers/PaginationHelperInfra';
import { DataBaseService } from '../../../infra/services/DataBaseService';

export class BaseSQLRepository {
    public modelName: string;
    private dbclient: any;

    constructor(modelName: string) {
        this.modelName = modelName;
        this.dbclient = DataBaseService.getInstance();
    }

    private async checkModel(): Promise<void> {
        if (!this.modelName) { throw new NotImplementedException('MODEL_NOT_FOUND'); }
    }

    public async upsert(data: object): Promise<void> {
        await this.checkModel();
        return this.dbclient[this.modelName].upsert(data);
    }

    public async list(include: object[], page: number, perPage: number): Promise<any> {
        await this.checkModel();
        const {limit, offset} = PaginationHelperInfra.getOffsetLimit(page, perPage);
        return this.dbclient[this.modelName].findAndCountAll({ include, limit, offset });
    }

    public async findOne(condition: object): Promise<any> {
        await this.checkModel();
        return this.dbclient[this.modelName].findOne({ where: condition });
    }
}
