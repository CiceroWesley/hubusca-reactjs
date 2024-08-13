import React, { useState } from 'react'
import instanceAxios from '../../utils/axios';
import { user } from '../../types/types';

const Home = () => {
    const [username, setUsername] = useState<string>('');

    const [user, setUser] = useState<user>();


    const handleSearch = async () => {
        try {
            const userData = username.trim();
            const response = await instanceAxios(`users/${userData}`);
            if(response){
                setUser(response.data)
                setUsername('');
            } else {
                throw 'Erro ao buscar usuário'
            }

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
        {user && <div>
            {user.name}
            <img src={user.avatar_url} alt="" />
            {user.login}
            {user.location}
        </div>}


    </div>
  )
}

export default Home