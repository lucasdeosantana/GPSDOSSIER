import { NextApiResponse} from 'next'
import requireAuth from '../../../Middleware/requireAuth'
import { NextApiRequestWithUser } from '../../../Middleware/INextApiRequest'
import database from '../../../database/mongo'
import { ObjectId } from 'mongodb'
interface IActivitiesRemove{
    id:string
}

const handle = async (req:NextApiRequestWithUser<IActivitiesRemove>, res:NextApiResponse) => {
    try{
        const db =  (await database).collection('activities')
        const { id } = req.body
        const _ObjectId = new ObjectId(id)
        const activity = await db.findOne({_id:_ObjectId})
        res.statusCode=200
        res.json(activity)
    }catch{
        res.statusCode = 500
        return res.send('there was an error!')
    }
}

export default requireAuth(handle)