import Router from 'koa-router'
import serve from 'koa-static'

const router = new Router();
console.log(__dirname)

router.get('/*', serve(__dirname + '/../app/build'))

// router.get('/', async (ctx) => {
//   console.log('hi')
// })

router.get('/connect', serve(__dirname + '/../job'))

export default router