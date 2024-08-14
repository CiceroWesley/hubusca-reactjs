import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { repository, user } from '../../types/types'
import instanceAxios from '../../utils/axios'
import User from '../../Components/User/User'
import useFetchUserData from '../../hooks/useFetchUserData'

type Props = {}

const Profile = (props: Props) => {
    const [user, setUser] = useState<user>();
    const [repository, setRepository] = useState<repository[]>([]);

    const { username } = useParams();

    const {loading, error, fetchUserData} = useFetchUserData();

    useEffect(() => {
        const handleSearch = async () => {
            const response = await fetchUserData(String(username))
            if(response){
                setUser(response)
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