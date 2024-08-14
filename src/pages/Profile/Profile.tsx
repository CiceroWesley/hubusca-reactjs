import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { repository, user } from '../../types/types'
import instanceAxios from '../../utils/axios'
import User from '../../Components/User/User'
import useFetchUserData from '../../hooks/useFetchUserData'
import useFetchUserRepository from '../../hooks/useFetchUserRepository'

type Props = {}

const Profile = (props: Props) => {
    const [user, setUser] = useState<user>();
    const [repository, setRepository] = useState<repository[]>();

    const { username } = useParams();

    const {loading: loadingUser, error: errorUser, fetchUserData} = useFetchUserData();
    const {loading: loadingRepository, error: errorRepository, getRepositories} = useFetchUserRepository();

    useEffect(() => {
        const handleSearch = async () => {
            const response = await fetchUserData(String(username))
            if(response){
                setUser(response)
            }
        }
        const handleRepository = async () => {
            const response = await getRepositories(String(username))
            if(response){
                setRepository(response)
            }
        }

     handleSearch();
     handleRepository();
    },[username])
    
  return (
    <div>
        {loadingUser || loadingRepository && <span>Carregando</span>}
        {errorUser || errorRepository && <span>{errorUser? errorUser : errorRepository}</span>}

        {user && repository && repository && <div>
            <User user={user} repository={repository} full={true}/>
        </div>   
        }  
    </div>
  )
}

export default Profile