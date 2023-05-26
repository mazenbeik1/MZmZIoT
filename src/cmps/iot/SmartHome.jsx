import { Button, Tabs, Tab } from 'react-bootstrap';
// import axios from 'axios';
import { useEffect, useState } from 'react';
import Lights from './Lights';
import Door from './Door';
import Temperature from './Temperature';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {io} from 'socket.io-client'

const SmartHome = () => {
	// const {loading, authenticated,error,successMessage,personalInfo} = useSelector(state=>state.auth)
    
	const navigate = useNavigate();
	const socket = io.connect('https://iotwebservice.onrender.com/');
    
	useEffect(()=>{
        const email = localStorage.getItem('email');
		if(!email){
			navigate('/login');
			alert("please login first");
		}
	})

	

	return (
	<div className="SmartHome">
		<img src="/imgs/IoT.png" className='SmartHomeLogo'></img>
		<Tabs
		defaultActiveKey="profile"
		id="justify-tab-example"
		className="mb-3"
		justify
		>
			<Tab eventKey="Lights" title="Lights" >
				<Lights socket={socket}/>
			</Tab>
			<Tab eventKey="Temperature" title="Temperature" >
				<Temperature socket={socket}/>
			</Tab>
			<Tab eventKey="Door" title="Door" >
				<Door socket={socket}/>
			</Tab>
		</Tabs>
	</div>
	);
}
 
export default SmartHome;
