import { Job } from "bullmq";
import ContestQuery from "../Query/Contest";

const contestQuery = new ContestQuery();
export default async function contestsWorker(job:Job) {
    await contestQuery.createContest(job.data);
}