import React, { useState } from 'react'
import { user } from '../../types/types';

import User from '../../Components/User/User';
import useFetchUserData from '../../hooks/useFetchUserData';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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


const ButtonSearch = styled.button`
    background-color: dodgerblue;
    color: white;
    padding: 4px;
    border: none;
    border-radius: 15%;
`

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <div>
            <h3>Busque um usuário</h3>

            <Link to='/users'>Veja os usuários buscados</Link>
        </div> 

        <div>
            <input type="text" placeholder='Insira o nome de usuário' value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
            <ButtonSearch onClick={() => handleSearch()}>Buscar</ButtonSearch>
        </div>
        {loading && <span>Carregando</span>}
        {error && <span>{error[0]}</span>}
        {user && <>
            <User user={user} full={false} />
        </>}
    </div>
  )
}

export default Home