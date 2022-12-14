import React, { useState } from 'react';

import { Button, Col, Form, Row } from 'react-bootstrap';

import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import initializeAuthentication from '../hooks/firebase.init';

import './login.css'
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';


initializeAuthentication();
const provider = new GoogleAuthProvider();



const Login = () => {
    const [user, setUser] = useState({})
    const auth = getAuth();
    const navigate = useNavigate();
    const location = useLocation();

    console.log('come from', location.state?.from)


    const redirect_url = location.state?.from || '/home'


    const [email, setEmail] = useState()
    const [passWord, setPassword] = useState()

    const handleEmailChange = (e) => {
        setEmail(e.target.value)

        console.log(e.target.value)
    }

    const handlePassWord = e => {
        setPassword(e.target.value)
        console.log(e.target.value)
    }
    const handleGoogleSignIn = () => {

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);

                // The signed-in user info.
                const { displayName, email, photoURL } = result.user;
                // ...
                const logeInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL

                };

                setUser(logeInUser);
                navigate(redirect_url)

            })

            .catch(error => {
                console.log(error.message)
            })


    }

    const handleUserSignIn = () => {




        signInWithEmailAndPassword(auth, email, passWord)
            .then(result => {
                // Signed in 
                const user = result.user;
                navigate(redirect_url)
                console.log(user)
            })
            .catch(err => {
                console.log(err.message)
            })




        console.log('clicked')



    }

    return (
        <Row>
            <Col lg={12} md={6} s={12} className="Specialize-div">


                <div className="login-form">
                    <Form>
                        <h5> Sign in Please</h5>
                        <Form.Group onBlur={handleEmailChange} className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group onBlur={handlePassWord} className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Stay Login" />
                        </Form.Group>

                        <Button onClick={handleUserSignIn} variant="primary">
                            Login
                        </Button>
                        <br />
                        or Login with Google  <br />
                        <Button onClick={handleGoogleSignIn} variant="warning">
                            <FaGoogle></FaGoogle>
                        </Button> <br />
                        <p>Did not register yet?</p>

                        <Link to="/register">
                            <Button on variant="primary" type="submit">
                                Signup
                            </Button>
                        </Link>

                    </Form>


                </div>

            </Col>


            {user.email && <div>

                <h3> Welcome {user.name}</h3>
            </div>



            }

        </Row>
    );
};

export default Login;