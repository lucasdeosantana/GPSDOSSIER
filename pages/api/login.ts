import { NextApiRequest, NextApiResponse} from 'next'
import database from '../../database/mongo'
import { IUser } from '../../interfaces'
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple'

export default async (req:NextApiRequest, res:NextApiResponse) => {
    const db = (await database).collection('users')
    const { username, password } = req.body
    const user = await db.findOne<IUser>({username})

    if(!user){
        res.statusCode = 401
        res.send("User not exist")
        return
    }
    const passwordIsValid = await bcrypt.compareSync(password ,user.password)
    if(!passwordIsValid){
        res.statusCode = 401
        res.send("Password is invalid")
        return
    }
    const payload = {
        id:user._id,
        name:user.firstName,
        iat: Math.round(Date.now() / 1000), 
        exp: Math.round(Date.now() / 1000 + 10) 
    }
    var token = jwt.encode(payload, process.env.SECRET)
    console.log(token)
    res.statusCode = 200
    res.send(token)
}
