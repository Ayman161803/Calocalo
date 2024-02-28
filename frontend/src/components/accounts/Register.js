import React, {useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {register} from '../../actions/auth'
import {Redirect} from 'react-router-dom'
import {Form,Col,Row,Button,Card, Container} from 'react-bootstrap'


const Register = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [password2,setPassword2] = useState("")
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    
    const createUser = e => {
        e.preventDefault()
        if(password && password2 && password===password2){
            dispatch(register(username,password))
        } else {
            alert("Passwords do not match")
        }
        setPassword("")
        setPassword2("")
        setUsername("")

    }
    const renderForm = () => {
        return (

            <Container>
            <Col style={{display:'flex', justifyContent:'center'}}>
            <Card style={{width:'35rem', marginTop:'10rem'}}>
                <Card.Body>
                    <Form onSubmit={createUser}>
                        <Form.Group as={Row} controlId="username">
                            <Form.Label column sm={5}>
                                Username
                            </Form.Label>
                            <Col sm={5} xs={5}>
                                <Form.Control 
                                    type="username"
                                    placeholder ="Enter Username" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="password1">
                            <Form.Label column sm={5}>
                            Password
                            </Form.Label>
                            <Col sm={5} xs={5}>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="password2">
                            <Form.Label column sm={5}>
                            Confirm Password
                            </Form.Label>
                            <Col sm={5} xs={5}>
                            <Form.Control type="password" placeholder="Confirm Password" 
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}/>
                            </Col>
                        </Form.Group>
                        <Container style={{display:'flex', justifyContent:'center'}}>
                        <Button variant="primary" type="submit">
                            Create Account
                        </Button>  
                        </Container>          
                    </Form>
                </Card.Body>
            </Card>
            </Col>   
            </Container> 
        )
    }

    return (<> {auth.isAuthenticated ? <Redirect to="/" /> :renderForm()}</>
        
    )
}

export default Register