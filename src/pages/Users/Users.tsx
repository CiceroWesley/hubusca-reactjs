import { useEffect, useState } from 'react'
import { user } from '../../types/types'
import User from '../../Components/User/User'
import useFetchUserData from '../../hooks/useFetchUserData'
import loadingGif from '../../assets/loading.gif'


const Users = () => {
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
    <main style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <h3>Usuários já pesquisados</h3>
        {loading && <img src={loadingGif} width='20%'></img>}
        {error && <span>{error[0]}</span>}
        {usersData && usersData.map((user) => (
            <div style={{margin: '5px 0 25px 0'}}>
              <User key={user.login} user={user} full={false}/>
            </div>
        ))}
    </main>
  )
}

export default Users