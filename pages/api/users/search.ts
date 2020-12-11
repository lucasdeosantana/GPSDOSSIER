import { NextApiResponse} from 'next'
import requireAuth from '../../../Middleware/requireAuth'
import { NextApiRequestWithUser } from '../../../Middleware/INextApiRequest'
import database from '../../../database/mongo'

interface ISearchUser{
    name:string
}

const handle = async (req:NextApiRequestWithUser<ISearchUser>, res:NextApiResponse) => {
    try{
        const db =  (await database).collection('users')
        const { name } = req.body
        const users =  (await db.find({"firstName":name}).toArray()).map(user=>{
            const { password, username, createdAt, ...securityUser } = user
            return securityUser
        })
        res.statusCode = 200
        return res.json(users)
    }catch{
        res.statusCode = 500
        return res.send("The server has a Error!")
    }
}

export default requireAuth(handle)