import React, { useState, useContext, createContext } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { useRouter } from 'next/router'
import data from '../services/context'
import cookie from 'cookie-cutter'


export default function Home() {
  const [username, setUsername ] = useState("")
  const [password, setPassword] = useState("")
  const [isChecked, setChecked] = useState(false)
  const context = useContext(data)
  const router = useRouter()

  function handleLogin(event:React.MouseEvent<HTMLFormElement>){
    event.preventDefault()  
    const login = {username, password}
    axios.post("/api/login", login)
    .then(answer => { 
      context.token = answer.data
      cookie.set('token', answer.data)
      router.push('/list')
    })
    .catch(error => console.log(error))
  
  }
  function handleUsername(event:React.ChangeEvent<HTMLInputElement>){
    setUsername(event.target.value)
  }
  function handlePassword(event:React.ChangeEvent<HTMLInputElement>){
    setPassword(event.target.value)
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>GPSDOSSIER - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Form className="col-sm-5" >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text" 
            placeholder="Enter email" 
            onChange={handleUsername} 
            value={username}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            onChange={handlePassword} 
            value={password} />
        </Form.Group>
        {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check 
            type="checkbox" 
            label="Mantenha me Logado" 
            checked={isChecked}
            onChange={()=>setChecked(!isChecked)}/>
        </Form.Group> */}
        <Button 
          className="col-sm-12" 
          variant="primary" 
          type="submit"
          onClick={handleLogin} >
          Entrar
        </Button>
      </Form>
    </div>
  )
}
