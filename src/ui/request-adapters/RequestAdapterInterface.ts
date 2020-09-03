export interface RequestAdapterInterface {
    getCommandQuery(data: object, context: object): any;

    getScheme(): object;
}
