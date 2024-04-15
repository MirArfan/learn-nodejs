const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const token_auth = require('./token-auth');
dotenv.config();
const PORT = 3000;
const jwtSecretkey = 'test12345';

const app = new Koa();
const router = new Router();

// router.get("/test", async(ctx, next)=>{
//     ctx.body="hello koa"
// })

router.post("/login", async (ctx) => {
    const { aud, userId } = ctx.request.body;
    if (!aud || !userId) {
        ctx.body = 404;
        ctx.body = { error: "Aud or useID not given" };
        return;
    }
    else {
        const token = jwt.sign({ aud, userId }, jwtSecretkey, {
            expiresIn: "1h",
        })
        ctx.body = { token: token }
    };

})
router.get('/protected', token_auth, async(ctx)=>{
    ctx.body={
        aud:ctx.state.user.aud,
         userId: ctx.state.user.userId,
    }
})

app.use(bodyParser());
app.use(router.routes());

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
})


