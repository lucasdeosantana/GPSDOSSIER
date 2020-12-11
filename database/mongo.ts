import {MongoClient, Db} from 'mongodb'
import url from 'url'

let cacheDb :Db = null

async function connectToDatabase(){
    if(cacheDb){
        return cacheDb
    }
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology :true
    })
    const dbName = url.parse(process.env.MONGODB_URI).pathname.substr(1)
    const db = client.db(dbName)
    cacheDb = db
    return cacheDb

}

export default connectToDatabase()