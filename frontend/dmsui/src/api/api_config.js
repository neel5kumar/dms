export default class ApiConfig{
    
    constructor(rootUrl,headers,format){
        this.rootUrl=rootUrl
        this.headers=headers
        this.format=format
    } 
    getAllUrl(){
        return this.rootUrl+"/?format="+this.format;
    }
    getOneUrl(id){
        return this.rootUrl+"/"+id+"/?format="+this.format;
    }
    putOneUrl(id){
        return this.rootUrl+"/"+id+"/?format="+this.format;
    }
    postOneUrl(){
        // return this.rootUrl+"/"+id+"/?format="+this.format;
        return this.rootUrl+"/?format="+this.format;
    }
    deleteOneUrl(id){
        return this.rootUrl+"/"+id+"/?format="+this.format;
    }
    deleteDummyUrl(id){
        return this.rootUrl+"/?format="+this.format;
    }
    getHeaders(){
        return this.headers
    }
}