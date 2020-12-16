import React, { useContext } from 'react'
import { NextPage } from 'next'
import api from 'axios'
import cookie from 'cookies'
import { useRouter } from 'next/router'

const list:NextPage = (props)=>{
    const router = useRouter()
    return(
        <div>Ready</div>
    )
}

list.getInitialProps= async context => {
    try{
        const cook = new cookie(context.req, context.res)
        const token = cook.get('token')
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const activities = (await api.post(`http://${context.req.headers.host}/api/activities/find`)).data
        return {
            "activities":activities,
            "error":false
        }
    }catch{
        context.res.writeHead(302, { Location: '/login' });
        context.res.end();
        return
    }
}
export default list