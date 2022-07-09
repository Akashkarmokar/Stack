/**
 * Internal Imports
 */
import Contest from './FetchCodeforcesData/Contests'
import Problem from './FetchCodeforcesData/Problems'
import ContestsWorker from './Workers/Contest'
import ProblemsWorker from './Workers/Problem'

/**
 * External Modules
 */
import { Worker,Job } from 'bullmq';




const contest = new Contest();
const problem = new Problem();

const contestWorker = new Worker('contestQueue',ContestsWorker);
const problemWorker = new Worker('problemsQueue',ProblemsWorker);


const delayTime = 1000 * 5;


export default async function startBackgroundJob(){
    contestWorker.on('completed',async(job:Job)=>{
        console.log('New Finished Contest Stored in our DB')
        await contest.removeJobById(job.id);
        let isProblemAdded:Boolean = await problem.addToQueue();
    })
    problemWorker.on('completed',async(job:Job)=>{
        console.log("New Finished Contest's problem stored in DB");
        await problem.removeJobById(job.id);
    })
    console.log('Background Job Started');
    setTimeout(async function run(){
        console.log('************** Set Timeout Function Call Again ********************')
        let isContestAdded:Boolean = await contest.addToQueue();
        setTimeout(run,delayTime);
    },delayTime);
}