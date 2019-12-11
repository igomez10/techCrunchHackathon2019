import cors from '@koa/cors'
import Koa from 'koa'
import koaBody from 'koa-body'
import mount from 'koa-mount'
import serve from 'koa-static'

import ApiRouter from './api.router'

const a = new Koa();
a.use(serve(__dirname + '/../wasm'))

const b = new Koa();
b.use(serve(__dirname + '/../app/build'))

const app = new Koa();
app.use(koaBody({ multipart: true }));
app.use(cors());
app.use(ApiRouter.routes())
app.use(mount('/connect', a))
app.use(mount('/', b))
export {app}
