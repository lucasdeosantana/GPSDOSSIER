import { NextApiResponse} from 'next'
import requireAuth from '../../../Middleware/requireAuth'
import { NextApiRequestWithUser } from '../../../Middleware/INextApiRequest'
import database from '../../../database/mongo'

const handle = async (req:NextApiRequestWithUser<any>, res:NextApiResponse) => {
    try{
        const db =  (await database).collection('activities')
        const { id } = req.user
        console.log(id)
        const activities =  (await db.find({"users":{$elemMatch:{user:id}}}).toArray())
        res.json(activities)
    }catch{
        res.statusCode = 500
        res.send("there was an error!")
    }
     
}

export default requireAuth(handle)