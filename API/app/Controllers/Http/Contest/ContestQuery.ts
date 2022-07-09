import Contest from "App/Models/Contest";
import ContestType from "App/Models/ContestType";
import ContestCategory from "App/Models/ContestCategory";

export default class ContestQuery{
    /**
     * CRUD Operations:
     */
    public async all(){
        return Contest.all();
    }


    public async types(){
        return ContestType.query().select(['id','title']);
    }

    public async categories(){
        return ContestCategory.query().select(['id','title']);
    }

    public async problemList(data){
        const page = data.pageNumber;
        const limit = 100;
        if(data?.categoryId){
            const contestCategory = await ContestCategory.query().where('id',data.categoryId).firstOrFail();
            const contestAndProblems = await contestCategory.related('contests')
                    .query().where('phase','FINISHED')
                    .preload('problems',problemQuery=> {
                        problemQuery.orderBy('index','asc').select('id','prefix_contest_id','type_id','contest_id','index','name','points','rating')
                    }).select(['id','type_id','contest_id','name']).paginate(page,limit);
            return contestAndProblems;
        }
        const contestType = await ContestType.query().where('id',data.typeId).firstOrFail();
        const contestAndProblms = await contestType.related('contests').query().where('phase','FINISHED').preload('problems',problemQuery=>{
                                    problemQuery.orderBy('index','asc').select('id','prefix_contest_id','type_id','contest_id','index','name','points','rating')
                                }).select(['id','type_id','contest_id','name']).paginate(page,limit);
        return contestAndProblms;
    }
    
}