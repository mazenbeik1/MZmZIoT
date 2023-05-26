import { auth, googleProvider } from "../../firebase/config";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import {useState} from "react";
import { Button, Col, FloatingLabel, Form, Row, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import {db} from '../../firebase/config'
import { SocialIcon } from 'react-social-icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { _setUser } from "../../Redux/user";
import { _setErrors } from "../../Redux/error";
import { useEffect } from "react";
// import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';


const Signup = (props) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const errors = useSelector((state) => state.errors.errors);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.email);
    const navigate = useNavigate();
    

    useEffect(()=>{
        if(user != "Guest"){
            navigate("/");
        }
    })
    
    const signup = async()=>{
        try {
            if(password === confirmPassword){
                await createUserWithEmailAndPassword(auth,email,password).then(cred=>{
                    console.log(cred);
                });
            }else{
                alert('non-identical passwords');
                dispatch(_clearErrors());
                dispatch(_setErrors('non-identical passwords'));
                return;
            }
        } catch (error) {
            console.log(error);
            dispatch(_clearErrors());
            dispatch(_setErrors(error.message.split("Firebase:")[1]));
            return;
        }
        dispatch(_setUser({
            email: auth.currentUser.email,
            uid: auth.currentUser.uid
        }));

        
    }

    const signinWithGoogle = async(props)=>{
        try {
            await signInWithPopup(auth,googleProvider).then(cred=>{
                console.log(cred);
            });
        } catch (error) {
            dispatch(_clearErrors());
            dispatch(_setErrors(error.message.split("Firebase:")[1]));
            return;
        }
        dispatch(_setUser({
            email: auth.currentUser.email,
            uid: auth.currentUser.uid
        }));
    }

    return ( 
        <>
            <div className='Signup'>
                <Form className='SignupForm'>
                    <div className='SignupHeader'><h4>Signup</h4></div>

                    <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                        <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </FloatingLabel>
                    <Row>
                        <Col>
                            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                                <Form.Control type="password" placeholder='New Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="floatingPassword" label="Confirm password">
                                <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    
                        <Button className='primaryBtn mt-2 signupBtns' variant="primary" onClick={signup} style={{margin:'0'}}>Signup</Button>
                        <br />
                        <Button as={Link} to={'/login'} className='secondaryBtn signupBtns' variant="secondary" >Already have an account</Button>
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
                <Image src='/imgs/index.png' className="IndexImg" alt="logo"/>
            </div>
        </>

        );
}
 
export default Signup;