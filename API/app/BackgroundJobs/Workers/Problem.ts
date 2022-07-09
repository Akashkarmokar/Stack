import {Job} from "bullmq"
import ProblemQuery from '../Query/Problem'


const problemQuery = new ProblemQuery();
export default async function problemsWorker(job:Job){
    await problemQuery.createManyProblems(job.data);
} 