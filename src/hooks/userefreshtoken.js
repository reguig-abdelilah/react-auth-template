import useAuth from "./useauth"
import axios from "../api/axios"

const useRefreshToken = () => {
  const {auth ,setAuth} = useAuth()

  const refresh = async () => {
    const response = await axios.get('/auth/refresh',{withCredentials:true})
      auth?
      setAuth(prev=>{
          return {...prev, 
            accessToken: response?.data?.accessToken, 
            roles:response?.data?.roles}
      })
      :
      setAuth({accessToken:response?.data?.accessToken, roles:response?.data?.roles})
      return response?.data?.accessToken
    
  }
  return refresh
}

export default useRefreshToken