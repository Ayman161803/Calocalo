import React, {useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {login} from '../../actions/auth'
import {Redirect} from 'react-router-dom'
import {Form,Col,Row,Button,Card, Container} from 'react-bootstrap'



const Login = (props) => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const loginUser = (e) => {
        e.preventDefault()
        dispatch(login(username,password))
        setUsername("")
        setPassword("")
        return <Redirect to="/" />
    }
    
    const returnForm = () =>{
        return (

            <Container>
            <Col style={{display:'flex', justifyContent:'center'}}>
            <Card style={{width:'30rem', marginTop:'10rem'}}>
                <Card.Body>
                    <Form onSubmit={loginUser}>
                        <Form.Group as={Row} controlId="username">
                            <Form.Label column sm={4}>
                                Username
                            </Form.Label>
                            <Col sm={5} xs={5}>
                                <Form.Control type="username"
                                value={username} placeholder ="Enter Username" 
                                onChange={(e)=>setUsername(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}controlId="password1">
                            <Form.Label column sm={4}>
                            Password
                            </Form.Label>
                            <Col sm={5} xs={5}>
                            <Form.Control type="password"
                            value={password}  placeholder="Password" 
                            onChange={(e)=>setPassword(e.target.value)}/>
                            </Col>
                        </Form.Group>

                        <Container style={{display:'flex', justifyContent:'center'}}>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>                          
                        </Container>          
                    </Form>
                </Card.Body>
            </Card> 
            </Col>   
            </Container>        
        )
    }

    return (
    <>
    {auth.isAuthenticated ? <Redirect to="/" /> : returnForm() }
    </>)
}

export default Login