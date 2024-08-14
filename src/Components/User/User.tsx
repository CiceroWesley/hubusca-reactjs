
import { repository, user } from '../../types/types'
import { Link } from 'react-router-dom'

type Props = { 
    user: user,
    repository?: repository[],
    full: boolean
}

const User = (props: Props) => {
  return (
    <div>
        <div>
            <div>
                {props.full ? <img src={props.user.avatar_url} alt="" /> : <Link to={`/profile/${props.user.login}`}><img src={props.user.avatar_url} alt="" /></Link>}
            </div>
            <div>
                {props.user.name}
            </div>
            <div>
                {props.user.login}
            </div>
            <div>
                {props.user.location}
            </div>
        </div>

        {props.full && props.repository &&
            <>
                <div>
                    <span>{props.user.id}</span>
                    <span>{props.user.followers}</span>
                    <span>{props.user.public_repos}</span>
                </div>

                <div>
                {props.repository && props.repository.map((repo) => (
                    <a href={repo.html_url} target='_blank'>
                        <span>{repo.name}</span>
                        <span>{repo.language}</span>
                        <span>{repo.description}</span>
                        <span>{repo.created_at}</span>
                        <span>{repo.pushed_at}</span>
                    </a>
                ))}
                    
                </div>
            </>
            
        }

    </div>


  )
}

export default User