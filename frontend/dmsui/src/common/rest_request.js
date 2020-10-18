export default class RestRequest{
   
    constructor(method,url, headers,body){
        this.method=method
        this.url=url
        this.headers=headers
        this.body=body
    }
    
    static  restRequest(method,url, headers){
        return new RestRequest(method,url, headers);
    }
    static  restRequest(method,url, headers,body){
        return new RestRequest(method,url, headers,body);
    }
    getMethod(){
        return this.method
    }
    getUrl(){
        return this.url
    }
    getHeaders(){
        return this.headers
    }
    getBody(){
        return this.body
    }
}