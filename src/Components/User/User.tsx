
import { repository, user } from '../../types/types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Repository from '../Repository/Repository'

type Props = { 
    user: user,
    repository?: repository[],
    full: boolean
}

const Image = styled.img`
    height: 160px;
    border-radius: 50%;
    margin-top:15px;

`

const ImageWrapper = styled.div`
    text-align: center;
`


const CardWrapper = styled.div<{$sizeFull?: boolean}>`
    border-radius: 10px;
    height: ${props => props.$sizeFull ? "423px" : "290px"};
    width: 350px;
    box-shadow: 0px 12px 13px #808080ab;
}
`

const Name = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    padding: 8px;

`

const Login = styled.div`
    text-align: center;
    color: gray;
    padding-bottom: 8px;
`

const Location = styled.div`
        text-align: center;
        font-weight: bold;
        margin-bottom:5px;
`

const MoreInfo = styled.div`
    padding: 15px;
    border: 1px solid;
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-top: 3px solid dodgerblue;
    border-radius: 10px;
    box-shadow: 0px 6px 13px #808080ab;

`
const MoreInfoComponent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 8px;

`

const BackgroundBar = styled.div`
    background-color: dodgerblue;
    height: 90px;
    position: absolute;
    width: 350px;
    z-index:-1;
    border-radius: 10px 10px 0 0;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`


const User = (props: Props) => {
  return (
    <>
    <CardWrapper $sizeFull={props.full}>
        <BackgroundBar></BackgroundBar>    
        <Card>
            <ImageWrapper>
                {props.full ? <Image src={props.user.avatar_url} alt="" /> : <Link to={`/profile/${props.user.login}`}><Image src={props.user.avatar_url} alt="" /></Link>}
            </ImageWrapper>
            <Name>
                {props.user.name}
            </Name>
            <Login>
                {props.user.login}
            </Login>
            <Location>
                {props.user.location}
            </Location>    

            {props.full && <>
                <MoreInfo>
                    <MoreInfoComponent>
                        <span>{props.user.id}</span>
                        <span>ID</span>
                    </MoreInfoComponent>
                    <MoreInfoComponent>
                        <span>{props.user.followers}</span>
                        <span>Seguidores</span>
                    </MoreInfoComponent>
                    <MoreInfoComponent>
                        <span>{props.user.public_repos}</span>
                        <span>Repositórios</span>
                    </MoreInfoComponent>
                </MoreInfo>
            </>}
        </Card>
    </CardWrapper>
    {props.full && props.repository &&
        <div>
            {props.repository && props.repository.map((repo) => (
                <Repository repository={repo}/>
            ))}
        </div> 
    }
    </>
  )
}

export default User