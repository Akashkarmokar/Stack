import ContestQuery from "./ContestQuery";


export default class ContestService{
    private contestQuery : ContestQuery
    
    constructor(){
        this.contestQuery = new ContestQuery();
    }

    public async all(){
        return this.contestQuery.all();
    }
    public async types(){
        return this.contestQuery.types();
    }
    public async categories(){
        return this.contestQuery.categories();
    }
    public async problemList(data){
        return this.contestQuery.problemList(data);
    }
}