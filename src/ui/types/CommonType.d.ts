export interface ResponseInterface {
    message: string;
    status: number;
    content: any;
}

export interface RequestInterface {
    query?: any;
    body?: any;
    params?: any;
}