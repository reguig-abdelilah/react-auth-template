import { axiosPrivate } from "../api/axios"
import { useEffect } from "react"
import useRefreshToken from "./userefreshtoken"
import useAuth from "./useauth"


const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const {auth} = useAuth()

  useEffect(()=>{

    const requestInterceptor = axiosPrivate.interceptors.request.use(
        config=>{
            if(!config.headers['Authorization'])
                config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
            return config
        },
        error => Promise.reject(error)
    )

    const responseInterceptor = axiosPrivate.interceptors.response.use(
        response => response,
        async (error)=>{
            const prevRequest = error?.config
            if(error?.response?.status === 403 && !prevRequest?.sent){
                prevRequest.sent = true
                const newAccessToken = await refresh()
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                return axiosPrivate(prevRequest)
            }
            return Promise.reject(error)
        }
    )

    return ()=>{
        axiosPrivate.interceptors.response.eject(responseInterceptor)
        axiosPrivate.interceptors.request.eject(requestInterceptor)
    }
  }, [auth, refresh])

  return axiosPrivate
}

export default useAxiosPrivate