import { IUserRequest } from "./user.module/interfaces/user-request.interface";

declare namespace Express {
    export interface Request {
       user?: IUserRequest
    }
 }