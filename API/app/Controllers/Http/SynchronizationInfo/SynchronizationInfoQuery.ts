import SynchronizationInfo from "App/Models/SynchronizationInfo";

export default class SynchronizationInfoQuery{
    public async all(){
        return SynchronizationInfo.all();
    }
    public async mostRecent(){
        return SynchronizationInfo.query().orderBy('lastCodeforcesContestId','desc').firstOrFail();
    }
}