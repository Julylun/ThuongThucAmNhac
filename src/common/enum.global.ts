export enum HttpCode {

    //Successful code 200 - 299 : success
    OK = 200, //Thanh cong
    CREATED = 201, //Tao thanh cong
    ACCEPTED = 202, //Chap nhan
    SUCCESS_WITHOUT_RETURN_DATA = 204, //Thanh cong khong tra ve data


    //Client error 400 - 499 
    BAD_REQUEST = 400, //Yeu cau khong hop le do cu phap sai 
    UNAUTHORIZED = 401, //Yeu cau khong xac thuc | 
    PAYMENT_REQUIRED = 402, //Can phai thanh toan
    FORBIDDEN = 403, //Yeu cau hop le nhung khong co quyen User -> upload nhac | Artis moi dc 
    NOT_FOUND = 404, //Khong tim thay tai nguyen 
    METHOD_NOT_ALLOWED = 405, //HTTP khong ho tro yeu cau
    PAY_LOAD_TOO_LARGE = 413, //Yeu cau data cao vch 
    UNSUPPORTED_DATA_TYPE = 415, //Dinh dang khong ho tro
    TOO_MANY_REQUEST = 429, //Qua nhieu request trong mot thoi gian ngan 


    //Server error 500 - 599: loi tu phia server
    INTERNAL_SERVER_ERROR = 500, //Loi chung tren server khong xac dinh 
    BAD_GATEWAY = 502, //Server khong nhan duoc response tu server khac khi thuc hien yeu cau
    SERVICE_UNAVAILABLE = 503, //Sever qua tai hoac bao tri
}

export enum HttpMessage {
    //Successful code
    OK = 'Accepted and executed request successfully', //Thanh cong
    CREATED = 'Accepted request and created successfully', //Tao thanh cong
    ACCEPTED = 'Accepted request', //Chap nhan
    SUCCESS_WITHOUT_RETURN_DATA = 'Executed request and return without data', //Thanh cong khong tra ve data


    //Client error
    BAD_REQUEST = ' The request is invalid due to a syntax error.', //Yeu cau khong hop le do cu phap sai
    UNAUTHORIZED = ' Authentication is required to execute the request', //Yeu cau khong xac thuc
    PAYMENT_REQUIRED = 'Payment is required', //Can phai thanh toan
    FORBIDDEN = 'The server understands the request, but refuses to authorize it due to lack of permissions.', //Yeu cau hop le nhung khong co quyen
    NOT_FOUND = 'The requested resource could not be found', //Khong tim thay tai nguyen
    METHOD_NOT_ALLOWED = 'The HTTP method used is not allowed for the resource', //HTTP khong ho tro yeu cau
    PAY_LOAD_TOO_LARGE = 'The request payload is too large', //Yeu cau data cao vch
    UNSUPPORTED_DATA_TYPE = ' The media type of the request is not supported.', //Dinh dang khong ho tro
    TOO_MANY_REQUEST = 'The client has sent too many requests in a short period.', //Qua nhieu request trong mot thoi gian ngan


    //Server error
    INTERNAL_SERVER_ERROR = ': A generic server error occurred, the server could not process the request', //Loi chung tren server khong xac dinh
    BAD_GATEWAY = ' The server, while acting as a gateway, received an invalid response from an upstream server.', //Server khong nhan duoc response tu server khac khi thuc hien yeu cau
    SERVICE_UNAVAILABLE = 'The server is temporarily unable to handle the request due to overload or maintenance', //Sever qua tai hoac bao tri

}