import { auth, googleProvider } from "../../firebase/config";
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import {useEffect, useState} from "react";
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import {db} from '../../firebase/config'
import { SocialIcon } from 'react-social-icons';
import { useDispatch, useSelector } from "react-redux";
import { _setUser } from "../../Redux/user";
import { _setErrors,_clearErrors } from "../../Redux/error";
// import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';


const Signin = (props) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const errors = useSelector((state) => state.errors.errors);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.email);
    const navigate = useNavigate();
    

    useEffect(()=>{
        if(user != "Guest"){
            navigate("/");
        }
    })

    const signin = async(props)=>{
        try {
            if(password){
                await signInWithEmailAndPassword(auth,email,password);
            }else{
                dispatch(_clearErrors());
                dispatch(_setErrors("please enter a password"));
                return;
            }
        } catch (error) {
            dispatch(_clearErrors());
            dispatch(_setErrors(error.message.split("Firebase:")[1]));
        }
        console.log(auth?.currentUser?.uid);
        dispatch(_setUser({
            email: auth.currentUser.email,
            uid: auth.currentUser.uid
        }));
        navigate("/");
    }

    const signinWithGoogle = async()=>{
        try {
            await signInWithPopup(auth,googleProvider);
        } catch (error) {
            console.log(error);
            dispatch(_clearErrors());
            dispatch(_setErrors(error.message.split("Firebase:")[1]));
            return;
        }
        console.log(auth?.currentUser?.uid);
        dispatch(_setUser({
            email: auth.currentUser.email,
            uid: auth.currentUser.uid
        }))
        navigate("/");
    }

    return ( 
        <>
            <div className='Signup'>
                
                <Form className='SignupForm'>
                    <div className='SignupHeader'><h4>Login</h4></div>

                    <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                        <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </FloatingLabel>
                    
                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                        <Form.Control type="password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </FloatingLabel>
                        
                    
                        <Button className='primaryBtn mt-2 signupBtns' variant="primary" onClick={signin} style={{margin:'0'}}>Login</Button>
                        <br />
                        <Button as={Link} to={'/signup'} className='secondaryBtn signupBtns' variant="secondary" >Don't have an account</Button>
                        <br />
                        <button type="button" className="fab btn btn-link btn-floating mx-1 googleButton" id='fab-fb' onClick={signinWithGoogle}>
                            <SocialIcon network="google" />
                        </button>

                        {/* <button type="button" className="fab btn btn-link btn-floating mx-1" id='fab-go'> 
                            <SocialIcon network="facebook" />
                        </button> */}
                        {/* <button type="button" className="fab btn btn-link btn-floating mx-1" id='fab-fb' >
                            <SocialIcon network="discord" />
                        </button>

                        <button type="button" className="fab btn btn-link btn-floating mx-1" id='fab-go'> 
                            <SocialIcon network="github" />
                        </button> */}

                    {/* <Fabs/> */}

                    {/* <Link to='/login'>Already have an account</Link> */}
                </Form>
                <img src='/imgs/index.png' className="IndexImg" alt="logo" />
            </div>
        </>

        );
}
 
export default Signin;