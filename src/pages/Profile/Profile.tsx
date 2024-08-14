import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { repository, user } from '../../types/types'
import instanceAxios from '../../utils/axios'

type Props = {}

const Profile = (props: Props) => {
    const [user, setUser] = useState<user>();
    const [repository, setRepository] = useState<repository[]>([]);

    const { username } = useParams();



    useEffect(() => {
        const handleSearch = async () => {
            try {
                let userData = username;
                userData = userData?.trim();
                const response = await instanceAxios(`users/${userData}`);
                if(response){
                    setUser(response.data)
                    console.log(response.data)
                } else {
                    throw 'Erro ao buscar usuário'
                }
    
            } catch (error) {
                console.log(error)
            }
        }
        const handleRepository = async () => {
            try {
                const response = await instanceAxios.get(`users/${username?.trim()}/repos`);
                if(response){
                    setRepository(response.data)
                }

            } catch (error) {
                console.log(error)
            }

        }


     handleSearch();
     handleRepository();
    },[username])
    
  return (
    <div>
        {user && 
            <div>
                <img src={user.avatar_url} alt="" />
                <span>{user.name}</span>
                <span>{user.login}</span>
                <span>{user.location}</span>
                <span>{user.id}</span>
                <span>{user.followers}</span>
                <span>{user.public_repos}</span>
            </div>
        }

        {repository && repository.map((repo) => (
            <div>
                <a href={repo.html_url} target='_blank'>
                    <span>{repo.name}</span>
                    <span>{repo.language}</span>
                    <span>{repo.description}</span>
                    <span>{repo.created_at}</span>
                    <span>{repo.pushed_at}</span>
                </a>
            </div>
        ))}
        
    </div>
  )
}

export default Profile