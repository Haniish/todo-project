import { createContext, ReactNode, useState } from "react";

// Define the user based on the previously defined User interface
interface User {
    name?: string;
    email?: string;
    password?: string;
    createdAt?: Date;
}

interface AppContextType {
    isAuth: boolean;
    loading: boolean;
    user: User;
    userName: string;
    setIsAuth: (isAuth: boolean) => void;
    setIsLoading: (loading: boolean) => void;
    setUser: (user: User) => void;
    setUserName: (userName: string) => void;
    
}

// Create Context with default values
export const AppContext = createContext<AppContextType>({
    isAuth: false,
    loading: false,
    user: {},
    userName: "",
    setIsAuth: () => {},
    setIsLoading: () => {},
    setUser: () => {},
    setUserName: () => {},
});

interface AppContextProviderProps {
    children: ReactNode;
}

// Provide Context
const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [loading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useState<User>({});
    const [userName, setUserName] = useState<string>("");

    const value = {
        isAuth,
        setIsAuth,
        loading,
        setIsLoading,
        user,
        setUser,
        userName,
        setUserName,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
