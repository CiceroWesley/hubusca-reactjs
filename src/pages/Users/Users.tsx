import React, { useEffect, useState } from 'react'
import instanceAxios from '../../utils/axios'
import { user } from '../../types/types'
import { Link } from 'react-router-dom'
import User from '../../Components/User/User'
import useFetchUserData from '../../hooks/useFetchUserData'

type Props = {}

const Users = (props: Props) => {
    const [usersData, setUsersData] = useState<user[]>();

    const {loading, error, fetchUserData} = useFetchUserData();

    useEffect(() => {
        const getUsers = async () => {
            const users = await localStorage.getItem('users');
            const usersInArray = JSON.parse(String(users))

            if(usersInArray){
                const responses = await Promise.all(
                    usersInArray.map(async (user: string) => {
                      const response = await fetchUserData(user);
                      if (response) {
                        return response;
                      } else {
                        console.log('Erro ao buscar usuário');
                        return null;
                      }
                    })
                  );

                  setUsersData(responses.filter((user): user is  user => user !== null));
            }
        }
        getUsers();
    }, [])

  return (
    <div>
        {loading && <span>Carregando</span>}
        {error && <span>{error}</span>}
        {usersData && usersData.map((user) => (
            <User key={user.login} user={user} full={false}/>
        ))}

    </div>
  )
}

export default Users