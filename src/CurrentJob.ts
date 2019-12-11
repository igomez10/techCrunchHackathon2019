class CurrentJob {
  private _jobId

  constructor() {
    this._jobId = '1'
  }
  setJobId(jobId) {
    this._jobId = jobId
  }
  
  get jobId() {
    return this._jobId
  }
}

const currentJob = new CurrentJob()
export default currentJob