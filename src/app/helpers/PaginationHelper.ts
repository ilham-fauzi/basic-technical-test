import { IPaginationMeta } from '../../app/types/CommonTypes';

export class PaginationHelper {
    public static generateMeta(page: number, perPage: number, totalData: number): IPaginationMeta {
        return {
            page,
            per_page: perPage,
            total: totalData,
            total_page: Math.ceil(totalData / perPage),
        };
    }
}
