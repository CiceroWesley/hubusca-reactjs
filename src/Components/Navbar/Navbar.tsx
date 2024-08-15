import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

const NavbarWrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 10px 0 10px;
`
const OptionsNav = styled.ul`
    display: flex;
    gap: 30px;
    list-style-type: none;
`

const NavButton = styled.li`
    background-color: dodgerblue;
    color: white;
    padding: 4px;
    border: none;
    border-radius: 15%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`
const HeaderDetails = styled.header`
    border: 0.5px solid black;
    background-color: azure;
    border-radius: 7px;
`

const Navbar = () => {
  return (
    <HeaderDetails>
        <NavbarWrapper>
            <div>
                <Link style={{textDecoration:'none', fontSize:'20px', fontWeight:'bold'}} to={'/'}>HUBusca</Link>
            </div>
            <div>
                <OptionsNav>
                    <NavButton><NavLink  style={{textDecoration:'none', color:'white', textAlign:'center'}} to={'/'}>Buscar</NavLink></NavButton>
                    <NavButton><NavLink style={{textDecoration:'none', color:'white', textAlign:'center'}} to={'/users'}>Usuários buscados</NavLink></NavButton>
                </OptionsNav>
            </div>
        </NavbarWrapper>
    </HeaderDetails>
  )
}

export default Navbar