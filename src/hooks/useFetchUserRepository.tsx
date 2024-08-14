import { useEffect, useState } from "react";
import instanceAxios from "../utils/axios";

const useFetchUserRepository = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string[]>([]);

        const getRepositories = async (username : string) => {
            setError([]);
            if(username === "undefined"){
                setError(prevValue => [...prevValue, 'Insira o nome de usuário']);
                return;
            }
            setLoading(true)
            try {
                const response = await instanceAxios.get(`users/${username}/repos`);
                if (response.data.error){
                    throw(response.data.error);
                }
                setLoading(false);
                return response.data;

            } catch (errorC) {
                setError(prevValue => [...prevValue, String(errorC)]);
                setLoading(false);
                return errorC;
            }
        }
    
    return {loading, error, getRepositories}
}

export default useFetchUserRepository;