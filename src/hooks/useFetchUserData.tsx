import { useState } from "react";
import instanceAxios from "../utils/axios";
import { user } from "../types/types";


const useFetchUserData = () => {
    const [userData, setUserData] = useState<user>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string[]>([]);

    const fetchUserData = async (username : string) =>{
        setError([]);
        if(username === "undefined"){
            setError(prevValue => [...prevValue, 'Insira o nome de usuário']);
            return;
        }
        setLoading(true)
        try {
            username = username.trim().toLowerCase();
            const response = await instanceAxios.get(`users/${username}`);
            if (response.data.error){
                throw(response.data.error)
            }
            setLoading(false);
            return response.data;
            

        } catch (errorC) {
            setError(prevValue => [...prevValue, 'Usuário não encontrado']);
            setLoading(false);
            return 404;
        }
    }
    
    return {loading, error, fetchUserData}
}

export default useFetchUserData;