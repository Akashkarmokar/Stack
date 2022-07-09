/**
 * Externals Modules
 */
import {Queue} from 'bullmq'
import axios from 'axios';

/**
 * Internal Modules
 */
// import SynchronizationInfoQuery from 'App/Controllers/Http/SynchronizationInfo/SynchronizationInfoQuery';
import SynchronizationInfoQuery from '../Query/SynchronizationInfo';

export default class Contest {
    private apiEndpoint: string
    private queue: Queue
    private synchronizationInfoQuery: SynchronizationInfoQuery

    constructor(){
        // this.apiEndpoint = "https://codeforces.com/api/contest.list?gym=true";
        this.apiEndpoint = "https://codeforces.com/api/contest.list";
        this.queue = new Queue('contestQueue')
        this.synchronizationInfoQuery = new SynchronizationInfoQuery()
    }
    /**
     * unstoredContestsList : Get All Contest From Codeforces API and then check which parts required to store our DB
     * 
     * @returns Array of Contests which is not stored in DB
     */
    private async unstoredContestsList(){
        try {
            const res = await axios.get(this.apiEndpoint);
            const allContest = res.data.status == 'OK' ? res.data.result : [];
            allContest.sort(function (objtectOne,objtectTwo){
                return objtectTwo.id - objtectOne.id;
            })
            let leftIndex = -1; // Good Items
            let rightIndex = allContest.length; // Bad Item
            
            /**
             * lastSyncContestId fetch from DB
             */
            const {lastCodeforcesContestId: lastSyncContestId} = await this.synchronizationInfoQuery.mostRecent();
            while(leftIndex+1<rightIndex){
                let mid = Math.floor((leftIndex+rightIndex)/2);
                if(allContest[mid].id<=lastSyncContestId){
                    rightIndex = mid;
                }else{
                    leftIndex = mid;
                }
            }
            const newItems = allContest.slice(0,rightIndex);
            if(!newItems.length){
                return [];
            }
            leftIndex = -1;
            rightIndex = newItems.length;
            while(rightIndex > leftIndex + 1){
                let mid = Math.floor((leftIndex+rightIndex)/2);
                if(newItems[mid].phase == 'FINISHED'){
                    rightIndex = mid;
                }else{
                    leftIndex = mid;
                }
            }
            const unstoredContest = newItems.slice(rightIndex,newItems.length-rightIndex);
            console.log('find some contest to add:', unstoredContest.length);
            return unstoredContest;
        } catch (error) {
            console.log("Error From Contest API call segment: Server Problem");
            return [];
        }
        
    }
    public async addToQueue(){
        const unstoredContests = await this.unstoredContestsList();
        if(unstoredContests.length){
            await this.queue.add('contestList',unstoredContests);
            return true;
        }
        return false;
    }

    public async removeJobById(jobId){
        await this.queue.remove(jobId);
    }
}