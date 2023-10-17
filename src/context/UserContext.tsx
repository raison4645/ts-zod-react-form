import { createContext, useState, ReactNode } from "react";

type UserContextType = {
  userName: string,
  email: string,
  id: number,
  isCitizen: boolean
}

interface Props {
  children?: ReactNode
}

export const UserContext = createContext<any>(null)

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserContextType>(
    {
      userName: '',
      email: '',
      id: NaN,
      isCitizen: false
    }
  )
  return (
    <UserContext.Provider value={{user, setUser}}>
      { children }
    </UserContext.Provider>
  )
}

