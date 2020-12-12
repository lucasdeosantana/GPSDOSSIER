import { NextApiResponse} from 'next'
import requireAuth from '../../../Middleware/requireAuth'
import { NextApiRequestWithUser } from '../../../Middleware/INextApiRequest'
import database from '../../../database/mongo'



interface IActivityCreate{
    description:string
    orderType:string
    orderNumber:number
    date:number
    users:string[]
    skills:[[string,number]]
}

const handle = async (req:NextApiRequestWithUser<IActivityCreate>, res:NextApiResponse) => {
    try{
        const db =  (await database).collection('activities')
        const { description, orderType, orderNumber, date, users, skills } = req.body
        const usersFormatted = users.map(user=>{ return {"user":user, "accepted":false } })
        const allUsers = [{"user":req.user.id, "accepted":true }, ...usersFormatted]
        const newActivity = await db.insertOne({
            description,
            orderType,
            orderNumber,
            date,
            users:allUsers,
            skills,
        })
        res.statusCode= 201
        res.json(newActivity)
        return res
    }catch{
        res.statusCode = 401
        res.send("There was an error")
        return res
    }
}

export default requireAuth(handle)