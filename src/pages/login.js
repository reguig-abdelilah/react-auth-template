import React from 'react'
import { useState, useRef, useEffect } from 'react'
import axios from '../api/axios'
import useAuth from '../hooks/useauth'
import { Link, useNavigate, useLocation } from 'react-router-dom'
const LOGIN_URL = '/auth/signin/'


export const Login = () => {
    const {setAuth, persist, setPersist} = useAuth()
    const emailRef = useRef()
    const errRef =  useRef()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'

    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(()=>{
        if(emailRef.current !== undefined)
            emailRef.current.focus()
    }, [])
    useEffect(()=>{
        setErrMsg('')
    }, [email, pwd])

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({email: email, password:pwd}),
                {
                    headers:{
                        'Content-Type':'application/json',
                        withCredentials:true
                    }
                }
            )
            // console.log(response?.data)
            const accessToken = response?.data?.accessToken
            const roles = response?.data?.roles
            setAuth({email, pwd, accessToken, roles})
            // setEmail('')
            // setPwd('')
            navigate(from , {replace: true} )
        } catch (error) {
            if(!error?.response)
                setErrMsg('No Server Response')
            else if(error.response?.status === 400)
                setErrMsg('Missing Username or Password')
            else if(error.response?.status === 401)
                setErrMsg('Unauthorized')
            else
                setErrMsg('Login Failed')
            errRef.current.focus()
        }

    }
    const togglePersist=()=>{
        setPersist(prev => !prev)
    }
    useEffect(()=>{
        localStorage.setItem('persist',persist)
    },[persist])
  return (
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email" >Email: </label>
            <input 
                type="text"
                id='email' 
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />

            <label htmlFor="password" >Password: </label>
            <input 
                type="password"
                id='password' 
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
            />
            <button>Sign In</button>
            <div className='persistCheck'>
                <input type="checkbox" id='persist' value={persist} onChange={togglePersist} />
                <label htmlFor="persist">Trust This Device</label>
            </div>

        </form>
        <p>
            Need an Account?<br />
            <span className="line">
                {/*put router link here*/}
                <Link to="/register">Sign Up</Link>
            </span>
        </p>
    </section>
  )
}
