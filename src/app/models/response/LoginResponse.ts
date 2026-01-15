import { ClientRespone } from "./ClientResponse";

export interface LoginResponse {
    clientResponse: ClientRespone,
    token: string,
}