import { NextApiRequest, NextApiResponse} from 'next'
import jwt from 'jwt-simple'


const requireAuth = next => (req:NextApiRequest, res:NextApiResponse) => {
    try{
        const token = req.headers.authorization.substring(7)
        const decoded = jwt.decode(token, process.env.SECRET)
        if(decoded.exp <= Math.round(Date.now() / 1000)){
            res.statusCode = 401
            res.send("TOKEN EXPIRED")
            return
        }
        const user = { name:decoded.name , id: decoded.id }
        const reqWithUser = Object.defineProperty(req, "user", {value:user})
        return next(reqWithUser, res);
    }catch{
        res.statusCode = 401
        res.send("TOKEN INVALID")
        return
    }
    
 };
 
 export default requireAuth;