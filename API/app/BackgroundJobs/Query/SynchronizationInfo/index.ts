import SynchronizationInfo from "App/Models/SynchronizationInfo";

export default class SynchronizationInfoQuery{
    public async createSyncInfo(contestId){
        await SynchronizationInfo.create({lastCodeforcesContestId:contestId});
    }
    public async mostRecent(){
        return SynchronizationInfo.query().orderBy('lastCodeforcesContestId','desc').firstOrFail();
    }
    public async mostRecentProblem(){
        return SynchronizationInfo.query().orderBy('lastCodeforcesProblemId','desc').firstOrFail();
    }
    /**
     * 
     * @param contestId  This is the only one parameter to store our data base for future regonition.
     *     We are storing last problem's document by it's contestId
     */
    public async makeProblemSignature(contestId){
        await SynchronizationInfo.create({lastCodeforcesProblemId:contestId});
    }
}