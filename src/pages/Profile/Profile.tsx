import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { repository, user } from '../../types/types'
import instanceAxios from '../../utils/axios'
import User from '../../Components/User/User'

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
        {user && repository && <div>
            <User user={user} repository={repository} full={true}/>
        </div>   
        }  
    </div>
  )
}

export default Profile