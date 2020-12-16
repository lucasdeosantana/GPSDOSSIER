
import { createContext } from 'react'

export interface IContext{
    token:string
  }

const context = createContext<IContext>({token:""})
export default context
