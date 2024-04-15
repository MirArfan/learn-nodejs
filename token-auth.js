const jwt=require("jsonwebtoken");
const jwtSecretkey = 'test12345';
const token_auth=(ctx, next)=>{
    try {
        const token=ctx.headers.token;
        if(!token)
        {
            ctx.status=401;
            ctx.body={error:"No token provided" };
            return;
        }
        const decoded=jwt.verify(token, jwtSecretkey);
        const currentTimestamp=Date.now()/1000;
        if(decoded.exp && currentTimestamp>decoded.exp)
        {
            ctx.throw(401, " token has exprired");
        }
        ctx.state.user=decoded;
        
    } catch (error) {
        ctx.throw(401, "authentication failed");
    }
    return next();
}

module.exports=token_auth;