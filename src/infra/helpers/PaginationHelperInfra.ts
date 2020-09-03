export class PaginationHelperInfra {
    public static getOffsetLimit(page: number = 1, perPage: number = 10): { offset, limit } {
        let tempPage = page;
        if (tempPage === 0) { tempPage = 1; } page = 1;
        tempPage = tempPage - 1;

        const offset = tempPage * perPage;
        const limit = offset + perPage;

        return { offset, limit };
    }
}
