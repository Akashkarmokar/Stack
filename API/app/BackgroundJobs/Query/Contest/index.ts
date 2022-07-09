/**
 * Models's
 */
import Contest from "App/Models/Contest";
/**
 * Model's Query
 */
import ContestTypeQuery from "../ContestType";
import ContestCategory from "App/Models/ContestCategory";
import SynchronizationInfoQuery from "../SynchronizationInfo";
/**
 * Helper Functions
 */
import { getContestCategories } from "App/BackgroundJobs/Helper/contest";


export default class ContestQuery{
    private contestTypeQuery: ContestTypeQuery
    private synchronizationInfoQuery: SynchronizationInfoQuery

    constructor(){
        this.contestTypeQuery = new ContestTypeQuery();
        this.synchronizationInfoQuery = new SynchronizationInfoQuery()
    }

    
    /**
     * This Function invoke to make a specific probelm object and categoryInfo Array
     * @param contestInfo - Contest info object
     * @param categoryInfoArray  - Related categories array of string type
     */
    public async makeSingleContest(contestInfo,categoryInfoArray){
        let categoriesId:number[] = [];
        for(let idx = 0; idx< categoryInfoArray.length ;idx++){
            let cat = await ContestCategory.findBy('title',categoryInfoArray[idx]);
            if(cat == null){
                cat = await ContestCategory.create({title:categoryInfoArray[idx]});
            }
            categoriesId.push(cat.id);
        }
        const contest = await Contest.create(contestInfo);
        /**
         * Create Synchronization table row for future synchronization
         */
        await this.synchronizationInfoQuery.createSyncInfo(contest.contestId);
        /**
         * Make Intermediate Table
         */
        await contest.related('categories').attach(categoriesId);
    }


    /**
     * This function invoke from Contest Worker 
     * 
     * @param contestList 
     */
    public async createContest(contestList){
        for await (let eachContest of contestList ){
            let typeId = await this.contestTypeQuery.getTypeId(eachContest.type);
            const finalContestObj = {...eachContest};
            delete finalContestObj.id;
            delete finalContestObj.type;
            finalContestObj.typeId = typeId;
            finalContestObj.contestId = eachContest.id;
            const categories = getContestCategories(eachContest.name);
            await this.makeSingleContest(finalContestObj,categories);
        }
    }

    public async getContestId(contestId:Number){
        const contest = await Contest.findByOrFail('contestId',contestId);
        return contest.id;
    }
}