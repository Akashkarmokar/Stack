import SynchronizationInfoQuery from "./SynchronizationInfoQuery";

export default class SynchronizationInfoService{
    private synchronizationInfoQuery : SynchronizationInfoQuery

    constructor(){
        this.synchronizationInfoQuery = new SynchronizationInfoQuery();
    }
    public async all(){
        return this.synchronizationInfoQuery.all()
    }

    public async mostRecent(){
        return this.synchronizationInfoQuery.mostRecent();
    }
}