import { NextApiRequestWithUser } from './../../../Middleware/INextApiRequest';
import { NextApiResponse} from 'next'
import database from '../../../database/mongo'
import bcrypt from 'bcrypt'
import requireAuth from '../../../Middleware/requireAuth'

interface IUserCreate{
    firstName:string
    lastName:string
    password:string
    username:string
}
const handle = async (req:NextApiRequestWithUser<IUserCreate>, res:NextApiResponse) => {
    const db =  (await database).collection('users')
    const {
        firstName,
        lastName,
        password,
        username
    } = req.body
    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS))
    const newUser = await db.insertOne({
        firstName,
        lastName,
        password:hashedPassword,
        username,
        createdAt:new Date()
    })
    const { password:pw, ...securityUser } = newUser.ops[0]
    res.statusCode = 201
    res.json(securityUser)
}

export default requireAuth(handle)