/**
 * External Modules
 */
import { Queue } from "bullmq"
import axios from "axios"
import SynchronizationInfoQuery from "../Query/SynchronizationInfo"
export default class Problem{
    private apiEndPoint: string
    private queue: Queue
    private synchronizationInfoQuery: SynchronizationInfoQuery

    constructor(){
        this.apiEndPoint = 'https://codeforces.com/api/problemset.problems'
        this.queue = new Queue('problemsQueue');
        this.synchronizationInfoQuery = new SynchronizationInfoQuery()
    }
    public async unstoredProblemsList(){
        try {
            const res = await axios.get(this.apiEndPoint);
            
            const { problems: allProblems , problemStatistics: allProblemsStatistics} = res.data.result;
            allProblems.sort(function(objtectOne,objtectTwo){
                return objtectTwo.contestId - objtectOne.contestId;
            })
            let leftIndex = - 1 // Good Items - point to larger contestId 
            let rightIndex = allProblems.length // Bad Items

            /**
             * lastSyncProblemId fetched From DB
             */
            const { lastCodeforcesProblemId : lastSyncProblemId } = await this.synchronizationInfoQuery.mostRecentProblem();
            while(leftIndex + 1 < rightIndex){
                let mid = Math.floor((leftIndex+rightIndex)/2);
                if(allProblems[mid].contestId > lastSyncProblemId ){
                    leftIndex = mid;
                }else{
                    rightIndex = mid;
                }
            }
            const unstoredProblems = allProblems.slice(0,leftIndex+1);
            return unstoredProblems;
            

        } catch (error) {
            console.log('Error from Problem API call: Server side Problem')
            return [];
        }
    }

    public async addToQueue(){
        const unstoredProblemLists = await this.unstoredProblemsList();

        if(unstoredProblemLists.length){
            await this.queue.add('problemList',unstoredProblemLists);
            return true;
        }
        return false;
    }
    
    public async removeJobById(jobId){
        await this.queue.remove(jobId);
    }
}