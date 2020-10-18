import * as ResponseStatus from './response_status'
export default class ReponseHandler{
    static isSuccessful(received){
        return received.status==ResponseStatus.Successful
    }
    
}