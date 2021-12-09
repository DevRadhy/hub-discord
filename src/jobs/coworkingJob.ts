import { Job, JobCallback, scheduleJob } from "node-schedule";

class CoworkingJob {
  private job: Job;

  create(time: string, callback: JobCallback) {
    const job = scheduleJob(time, callback);

    this.job = job;
  }

  delete() {
    this.job.cancel();
  }
}

export { CoworkingJob };