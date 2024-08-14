import React, { useState } from 'react'
import { user } from '../../types/types';

import User from '../../Components/User/User';
import useFetchUserData from '../../hooks/useFetchUserData';

const Home = () => {
    const [username, setUsername] = useState<string>('');

    const [user, setUser] = useState<user>();

    const {loading, error, fetchUserData} = useFetchUserData();

    const handleSearch = async () => {
        const response = await fetchUserData(username);
        if(response){
            saveUser(username)
        setUser(response)
        }
    }

    const saveUser = async (name : string) => {
        try {
            const users = localStorage.getItem('users');

            if(users === null){
                // const nameArray = [name]
                localStorage.setItem('users', JSON.stringify([name]))
                return;
            }
            let parsedUsers: string[] = JSON.parse(users);
            let newUsers : string[] = [];
            parsedUsers.forEach((element) => {
                newUsers.push(element)
            })
            if(!newUsers.includes(name) && name !== ''){
                newUsers.push(name)
            }
            localStorage.setItem('users', JSON.stringify(newUsers));
    
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <div>
        <div>
            <h3>Busque um usuário</h3>
        </div> 

        <div>
            <label>
                <span>Nome de usuário:</span>
                <input type="text" placeholder='Insira o nome de usuário' value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
            </label>
            <input type="submit" value='Buscar' onClick={() => handleSearch()} />
        </div>
        {loading && <span>Carregando</span>}
        {error && <span>{error}</span>}
        {user && <div>
            <User user={user} full={false} />
        </div>}
    </div>
  )
}

export default Home