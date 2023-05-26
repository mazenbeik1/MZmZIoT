import Signup from './cmps/Signup/Signup';
import WebNavbar from './cmps/WebNavbar/WebNavbar';
import Welcome from './cmps/Welcome/Welcome';
import Signin from './cmps/Signup/Signin';
import { auth } from './firebase/config';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import NotFound from './cmps/NotFound/NotFound';
// import { Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { _setUser } from './Redux/user';
// import { Alert } from 'react-bootstrap';
import { Alert } from '@mui/material';
import { _clearErrors } from './Redux/error';
import Portofolio from './cmps/Portofolio/Portofolio';
import SmartHome from './cmps/iot/SmartHome'

function App() {
	const dispatch = useDispatch();
	const errors = useSelector((state) => state.errors.errors);

	useEffect(()=>{
		if(localStorage.getItem("aguid")){
			let uid = localStorage.getItem("aguid");
			let email = localStorage.getItem("email");
			// let email = auth.getUsers(uid).then((userRecord) => {
			// 	// See the UserRecord reference doc for the contents of userRecord.
			// 	console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
			//   });
			// setUser(email);
			dispatch(_setUser({
				email: email,
				uid: uid
			}));
			// console.log(auth.currentUser.email);
			// forceUpdate();
		}
	})
	return (
		<div className="App">
			<Router>
				{errors.map((error)=>{
					return(<Alert severity="error" onClose={() => {dispatch(_clearErrors())}}>{error}</Alert>)
				})}
				<WebNavbar/>
				<Routes>
				
					<Route path="/" element={<Welcome/>} />
					{/* <Route path="/console">
						<Route path=":id" element={<Home/>} />
					</Route> */}
					{/* <Route path="/workouts">
						<Route path=":id" element={<Workouts/>} />
						<Route path="" element={<Workouts/>} />
					</Route> */}
					<Route path="/signup" element={<Signup />}/>
					<Route path="/login" element={<Signin />}/>
					<Route path="/portofolio" element={<Portofolio />}/>
					<Route path="/iot" element={<SmartHome />}/>
					<Route path='*' element={<NotFound/>}/>
				</Routes>
			</Router>
			<p className="copyRight" style={{ bottom: '2rem', width:'100%', textAlign:'center'}}>Copyright &copy; MeSoverse 2023</p>
		</div>
	);
}

export default App;
