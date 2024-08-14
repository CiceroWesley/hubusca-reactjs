import React, { useState } from 'react'
import instanceAxios from '../../utils/axios';
import { user } from '../../types/types';
import { Link } from 'react-router-dom';

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
                saveUser(userData)
            } else {
                throw 'Erro ao buscar usuário'
            }

        } catch (error) {
            console.log(error)
        }
    }

    const saveUser = async (name : string) => {
        try {
            const users = localStorage.getItem('users');
            console.log(users)

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
        {user && <div>
            {user.name}
            <Link to={`/profile/${user.login}`}><img src={user.avatar_url} alt="" /></Link>
            {user.login}
            {user.location}
        </div>}


    </div>
  )
}

export default Home