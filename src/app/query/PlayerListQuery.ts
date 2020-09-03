import { DataBaseService } from '../../infra/services/DataBaseService';

export class PlayerListQuery {
    public page: number;
    public perPage: number;
    public include: object[];

    constructor(
        page: number,
        perPage: number,
    ) {
        this.page = page;
        this.perPage = perPage;

        const db = DataBaseService.getInstance();
        this.include = [{
            model: db.tbl_team,
            required: true,
        }];
    }
}
