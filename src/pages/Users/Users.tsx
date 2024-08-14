import React, { useEffect, useState } from 'react'
import instanceAxios from '../../utils/axios'
import { user } from '../../types/types'
import { Link } from 'react-router-dom'
import User from '../../Components/User/User'

type Props = {}

const Users = (props: Props) => {
    const [usersData, setUsersData] = useState<user[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            const users = await localStorage.getItem('users');
            const usersInArray = JSON.parse(String(users))

            if(usersInArray){
                try {
                 usersInArray.forEach(async (user: string) => {
                    const response = await instanceAxios(`users/${user}`);
                    if(response){
                        setUsersData(prevValue => [...prevValue, response.data])
                    } else {
                        throw 'Erro ao buscar usuário'
                    }
                 });
                } catch (error) {
                    console.log(error)
                }
            }

            
        }
        getUsers();
    }, [])

    if(usersData){
        console.log(usersData)
    }

  return (
    <div>
        {usersData && usersData.map((user) => (
            <User user={user} full={false}/>
        ))}

    </div>
  )
}

export default Users