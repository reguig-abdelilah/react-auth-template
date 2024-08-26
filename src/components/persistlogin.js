import useRefreshToken from '../hooks/userefreshtoken'
import useAuth from '../hooks/useauth'
import { React, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
const PersistLogin = () => {

    const refresh = useRefreshToken()
    const { auth, persist } = useAuth()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const verifyRefreshToken = async() => {
            try{
                const response = await refresh()
            }catch(err){
                console.log(err)
            }finally{
                setIsLoading(false)
            }
        }
        
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false) 
        
    },[])


    
  return (
    <>
        {
            !persist ?
            <Outlet />
                : isLoading
                ? <h1>Loading ....</h1>
                : <Outlet />
        }
    </>
  )
}

export default PersistLogin