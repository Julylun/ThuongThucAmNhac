interface ResponseDataParams<D> {
    data: D | D[];
    statusCode: number;
    message: string;
}


export class ResponseData<D> {
    data: D | D[] = null;
    statusCode: number = null;
    message: string = null;


    constructor(params: ResponseDataParams<D> = {} as ResponseDataParams<D>) {
        this.data = (params.data) ? params.data : null;
        this.statusCode = (params.statusCode) ? params.statusCode: null;
        this.message= (params.message) ? params.message: null;
        
        return this;
    }
}