import { Toaster, toast } from "react-hot-toast";
import AllRoutes from "./components/AllRoutes";
import Header from "./components/Header";
import { useContext, useEffect } from "react";
import axios from "axios";
import { serverLink } from "./main";
import { AppContext } from "./components/AppContextProvider";

// Define the User interface based on the mongoose schema
interface User {
    name: string;
    email: string;
    password?: string; // Password is optional in the interface because we don't typically handle it on the frontend for security reasons.
    createdAt?: Date;  // This is optional because it has a default value.
}

function App() {
    const { setUser, setIsAuth, setIsLoading } = useContext(AppContext);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${serverLink}/users/MyProfile`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log("res:", res);
                setUser(res.data.user as User); // Use the defined User type
                setIsAuth(true);
                setIsLoading(false);
            })
            .catch((error: Error) => {
                console.log("error:", error);
                setUser({} as User); // Adjusted for the User type.
                toast.error("Login first");
                setIsAuth(false);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <Header />
            <AllRoutes />
            <Toaster />
        </>
    );
}

export default App;
