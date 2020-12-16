import { NextApiResponse} from 'next'
import requireAuth from '../../../Middleware/requireAuth'
import { NextApiRequestWithUser } from '../../../Middleware/INextApiRequest'
import database from '../../../database/mongo'

import { ObjectId } from 'mongodb'
interface IActivitiesUpdate{
    id:string
    description:string
    orderType:string
    orderNumber:number
    date:number
    users:string[]
    skills:[{string:number}]
}
const handle = async (req:NextApiRequestWithUser<IActivitiesUpdate>, res:NextApiResponse) => {
    try{
        const db =  (await database).collection('activities')
        const { id, description, orderType, orderNumber, date, users, skills } = req.body
        const _ObjectId = new ObjectId(id)
        await db.updateOne({_id:_ObjectId}, [
            {$set:{"description":description}},
            {$set:{"orderType":orderType}},
            {$set:{"orderNumber":orderNumber}},
            {$set:{"date":date}},
            {$set:{"users":users}},
            {$set:{"skills":skills}},
        ])
        res.statusCode=200
        res.json({
            _id:id,
            description,
            orderType,
            orderNumber,
            date,
            users,
            skills
        })
    }catch{
        res.statusCode = 500
        return res.send('there was an error!')
    }
}

export default requireAuth(handle)