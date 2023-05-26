import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CenterModal from '../CentralModal/CenterModal';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import TimeLine from '../Portofolio/PortoHeader/TimeLine';
const Welcome = ()=> {
    const user = useSelector((state) => state.user.email);
    const [showIntro, setShowIntro] = useState(false);
    // const handleCloseIntro = () => setShowIntro(false);
    // const handleShowIntro = () => setShowIntro(true);
    const navigate = useNavigate();
    return (
    <div className="WelcomePage">
        <div className="WelcomePage-content">
  
            
                        {/* <img src='/imgs/muscles-blurred.png' style={{width: 200, height: 200,borderRadius:"100px",display:"inline-block"}}/> */}
                        <br/>
                        <img src="/imgs/IoT.png" alt="Logo" style={{height:'30vh', transform:'translate(7px, 0)'}}/>
                    <h1 className='WelcomeMsg'>{`Welcome ${user.split("@")[0]}`}</h1>
                    <p>SMART HOME CONTROLLER</p>
                    <Button variant='primary' className='button1 button2' onClick={()=>navigate('/iot')}>Start</Button>
                    {/* <Button as={Link} to={'/cubesurfer'} variant='secondary' className='button1 button2'>Play Demo</Button> */}
                    {/* <CenterModal
                        show={showIntro}
                        title="CubeSurfer Intro"
                        intropath='/vids/IntroTrim.mp4'
                        onHide={() => handleCloseIntro()}
                    /> */}
        </div>
    </div>
    );
}


export default Welcome;