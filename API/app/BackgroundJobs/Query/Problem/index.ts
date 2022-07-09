/**
 *  Model's
 */

 import Problem from 'App/Models/Problem';

/**
 * Model's Query    
 */
import SynchronizationInfoQuery from '../SynchronizationInfo'
import ProblemTypeQuery from '../ProblemType';
import ContestQuery from '../Contest';
import ProblemTagQuery from '../ProblemTag';

export default class ProblemQuery{
    private synchronizationInfoQuery: SynchronizationInfoQuery
    private problemTypeQuery : ProblemTypeQuery
    private contestQuery : ContestQuery
    private problemTagQuery: ProblemTagQuery


    constructor(){
        this.synchronizationInfoQuery = new SynchronizationInfoQuery();
        this.problemTypeQuery = new ProblemTypeQuery();
        this.contestQuery = new ContestQuery();
        this.problemTagQuery = new ProblemTagQuery();
    }


    public async makeSingleProblem(problemInfo,tagids:any[]){
        const problem = new Problem();
        problem.prefixContestId = problemInfo.prefixContestId;
        problem.typeId = problemInfo.typeId;
        problem.contestId = problemInfo.contestId;
        problem.index = problemInfo.index;
        problem.name = problemInfo.name;
        problem.points = problemInfo.points;
        problem.rating = problemInfo.rating;
        await problem.save();

        /**
         * Create Synchronization data for future synchronization 
         */
        await this.synchronizationInfoQuery.makeProblemSignature(problem.contestId);

        /**
         * Make Intermediate Table
         */
        await problem.related('tags').attach(tagids);

    }

    public async createManyProblems(problems){
        for await (let eachProblem of problems){
            let prefixContestId = await this.contestQuery.getContestId(eachProblem.contestId);
            let typeId = await this.problemTypeQuery.getTypeId(eachProblem.type);

            let finalProblemObj = {...eachProblem};
            delete finalProblemObj.tags;
            finalProblemObj.prefixContestId = prefixContestId;
            finalProblemObj.typeId = typeId;
            /**
             * Make Tag id's array 
             */
            let tagIds = await this.problemTagQuery.getTagsIds(eachProblem.tags);
            /**
             * Let's Create A specific Problem
             */
            await this.makeSingleProblem(finalProblemObj,tagIds);
        }
    }
}