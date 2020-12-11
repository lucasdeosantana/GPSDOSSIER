import { NextApiRequest} from 'next'

export interface NextApiRequestWithUser<T> extends NextApiRequest {
    user:{
        name:string
        id: number
    }
    body:T
}