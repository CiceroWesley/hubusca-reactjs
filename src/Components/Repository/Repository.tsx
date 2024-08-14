import React from 'react'
import { repository } from '../../types/types'
import styled from 'styled-components'

import unavailable from '../../assets/unavailable.png'
import newIcon from '../../assets/plus.png'
import pushIcon from '../../assets/git.png'


type Props = {
    repository: repository
}

const CardWrapper = styled.div`
    border-radius: 10px;
    height: 275px;
    width: 350px;
    box-shadow: 0px 12px 13px #808080ab;
    margin-top:10px;
    overflow-y: auto;
}
`

const RepositoryInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding:10px;
`

const RepositoryInfoIcon = styled.div`
    display:flex;
    align-items: center;
`

const ColorInfo = styled.span`
    color:black;
`




const Repository = (props: Props) => {
  return (
    <CardWrapper>
        <a href={props.repository.html_url} target='_blank' style={{textDecoration: 'none'}}>
            <RepositoryInfo>
                <ColorInfo>{props.repository.name? <h3>{props.repository.name}</h3> : <img src={unavailable} alt=''/>}</ColorInfo>
                <ColorInfo>{props.repository.language? props.repository.language : <img src={unavailable}/>}</ColorInfo>
                <ColorInfo>{props.repository.description? props.repository.description : <img src={unavailable}/>}</ColorInfo>
                <RepositoryInfoIcon>
                    <img src={newIcon} alt="created icon" />
                    <ColorInfo>{props.repository.created_at? props.repository.created_at : <img src={unavailable}/>}</ColorInfo>
                </RepositoryInfoIcon>
                <RepositoryInfoIcon>
                    <img src={pushIcon} alt="Push icone" />
                    <ColorInfo>{props.repository.pushed_at? props.repository.pushed_at : <img src={unavailable}/>}</ColorInfo>
                </RepositoryInfoIcon>
                
            </RepositoryInfo>
        </a>
    </CardWrapper>
  )
}

export default Repository