import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { repository, user } from '../../types/types'
import User from '../../Components/User/User'
import useFetchUserData from '../../hooks/useFetchUserData'
import useFetchUserRepository from '../../hooks/useFetchUserRepository'
import Repository from '../../Components/Repository/Repository'
import loadingGif from '../../assets/loading.gif'

const Profile = () => {
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
    <main style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        {loadingUser || loadingRepository && <img src={loadingGif} width='20%'></img>}
        {errorUser || errorRepository && <span>{errorUser? errorUser : errorRepository}</span>}

        {user && repository && <div>
            <div style={{margin: '5px 0 30px 0'}}>
                <User user={user} full={true}/>
            </div>
        </div>   
        }  
        <div style={{display:'flex', flexWrap: 'wrap', justifyContent:'space-around'}}>
            {repository && repository.map((repo) => (
                <div style={{margin:'10px 0 15px 0'}}>
                    <Repository repository={repo}/>
                </div>
            ))}
        </div>
    </main>
  )
}

export default Profile