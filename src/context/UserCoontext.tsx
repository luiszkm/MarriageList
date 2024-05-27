import { createContext, useState } from "react";

export interface UserProps {
  
}

interface userProviderProps {
  children: React.ReactNode
}

type user = {
  name: string
  email: string
  photoURL: string
}

const userContext = createContext({} as UserProps)


export function userProvider ({children}:userProviderProps){
  const [user , setUser] = useState ()


  return (
    <userContext.Provider value={{}}>
      {children}
    </userContext.Provider>
  )

}