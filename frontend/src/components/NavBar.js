import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Navbar,Nav,Button, Container} from 'react-bootstrap'
import {logout} from '../actions/auth'
const NavBar = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    return (
        <>
        <Navbar bg="light" style={{color: "white"}} expand="lg" className="bg-body-tertiary">
            {
            auth.isAuthenticated ?
            <>
                <Container>
                <Navbar.Brand href="/">Your Calories Tracker App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                        <Nav.Link href="/" onClick={() => dispatch(logout())}>Logout</Nav.Link> 
                        <Navbar.Text style={{color: "white"}}>
                            Signed in as: <a href="#">{auth.user.username}</a>
                        </Navbar.Text>
                </Navbar.Collapse>
                </Container>
            </> :
            <>
                <Navbar.Brand href="/">Welcome</Navbar.Brand>
                <Nav.Link className="text-dark" href="/register">Sign up</Nav.Link>
                <Nav.Link className="text-dark" href="/login">Login </Nav.Link>
            </>
            } 
            
        </Navbar>
      </>
    )
}

export default NavBar