import React from 'react'
import useAuth from './useauth'
import axios from '../api/axios'

const useLogout = () => {
    const {setAuth} = useAuth()
    const logout = async ()=>{
        setAuth({}) 
        try {
            await axios.get('/auth/logout',{withCredentials:true})
        } catch (error) {
            console.error(error)            
        }
    }

    return logout
}

export default useLogout