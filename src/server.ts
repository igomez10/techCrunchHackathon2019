import Koa from 'koa'
import koaBody from 'koa-body'
import cors from '@koa/cors'
import ApiRouter from './api.router'
import AppRouter from './app.router'

const app = new Koa();
app.use(koaBody({ multipart: true }));
app.use(cors());
app.use(ApiRouter.routes())
app.use(AppRouter.routes())
export {app}
