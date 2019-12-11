import Router from 'koa-router'
import ConnectedClients from './connectedClients'
import CurrentJob from './CurrentJob'
import * as shortid from 'shortid'
import * as fs from 'fs'
import * as  path from 'path'

const router = new Router({prefix: '/api'});

router.post('/ping', async (ctx, next) => {
  ConnectedClients.addClient({
    name: 'test',
    ip: ctx.request.ip,
    lastPingAt: Date.now(),
    userAgent: 'user agent',
    cpu: 3423,
    maxMemory: 234890
  })
  const jobID = CurrentJob.jobId
  ctx.body = { jobID }
  ctx.response.set({
    jobID
  })
})


router.get('/connected_clients', async (ctx, next) => {
  ctx.body = ConnectedClients.connectedClients
})

router.post('/upload_binary', async (ctx, next) => {
  const job = ctx.request['body']
  const file = ctx.request.files && ctx.request.files.file;
  if(!file) throw new Error('no file')
  const reader = fs.createReadStream(file.path);
  const stream = fs.createWriteStream(path.join(__dirname, '/../job', Math.random().toString()));
  reader.pipe(stream);
  console.log('uploading %s -> %s', file.name, stream.path);
  // await setupNewJob(job)
  job.id = shortid.generate()
  CurrentJob.setJobId(job.id)
  const jobID = CurrentJob.jobId
  ctx.body = { jobID }
  ctx.response.set({
    jobID
  })
})

router.get('/currentJob', async (ctx) => {
  const jobID = CurrentJob.jobId
  ctx.body = {
    jobID
  }

  ctx.response.set({ jobID })
})

export default router