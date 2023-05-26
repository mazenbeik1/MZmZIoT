import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import Room from './Room';
import RGB from './RGB';
import Bedroom from './Bedroom';
import Livingroom from './Livingroom';
// import { Socket } from 'socket.io';


const Lights = (props) => {

	// const [LED, setLED] = useState({
	// 	mode : "1",
	// 	brightness : 0,
	// })
        
    // const [radioValue, setRadioValue] = useState('1');
      
    // const radios = [
    //     { name: 'OFF', value: '0' },
    //     { name: 'ON', value: '1' },
    //     { name: 'SENSOR', value: '2' },
    // ];

	const socket = props.socket;
    // socket.on('LED',(brightness)=>
    // {
	// 	brightness = parseInt(brightness);
    //     setLED({
	// 		...LED,
	// 		brightness
	// 	})
    // })

	// socket.on('LEDMode',(mode)=>
    // {
    //     setLED({
	// 		...LED,
	// 		mode
	// 	})
		
    // })

	// const sendReq = async () =>{
		

	// 	socket.emit('LED', LED.brightness.toString());
	// 	socket.emit('LEDMode', LED.mode.toString());
	// }


	// const handleMode = (e) => {
		
	// 	setLED({...LED,'mode': e.target.value})
	// 	// sendReq();
	// }

    // const handlebrightness = async (e) => {
	// 	if(e.target.name === "brightness"){
	// 		setLED({...LED,'brightness': e.target.value * 2})
	// 	}else if (e.target.name === "brighter"){
	// 		if(LED.brightness < 16) setLED({...LED,'brightness': (parseInt(LED.brightness)+2)})
	// 	}else if (e.target.name === "darker"){
	// 		if(LED.brightness > 0) setLED({...LED,'brightness': (parseInt(LED.brightness)-2)})
	// 	}
	// 	console.log(LED)
	// 	// sendReq();
	// }
	return (
		<div className="Lights" style={{textAlign: "center"}}>
            {/* <ButtonGroup style={{display:"inline-block"}}>
                {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={'outline-success'}
                    name='radio'
                    value={radio.value}
                    checked={LED.mode === radio.value}
                    onChange={handleMode}
                >
                    {radio.name}
                </ToggleButton>
                ))}
            </ButtonGroup> */}
			{/* <Button variant="secondary" onClick={handleMode} name='off' value='0'>Lights off</Button>
			<Button variant="warning" onClick={handleMode} name='sensors' value='2'>Lights Sensors</Button>
			<Button variant="success" onClick={handleMode} name='on' value='1'>Lights on</Button> */}
            {/* <div className="brigtnessControls my-5">
                <Button variant="primary" className='mx-2' onClick={handlebrightness} name='darker' style={{display:"inline-block"}}>-</Button>
                    <input type='range' name='brightness' value={LED.brightness/2 || 0} min='0' max='8' onChange={handlebrightness}/>
                <Button variant="primary" className='mx-2' onClick={handlebrightness} name='brighter'>+</Button>
            </div> */}
			{/* <div><h1>mode: {LED.mode}</h1> <h1>brightness: {LED.brightness}</h1></div> */}
			{/* <Button variant='danger' onClick={sendReq} style={{width: "20rem", height:"5rem"}}>APPLY</Button> */}
			<Bedroom className='room' title='bedroom' socket={socket}/>
			<Livingroom className='room' title='livingroom' socket={socket}/>
			{/* <Room title='RGBroom' socket={socket}></Room> */}
			<RGB className='room' title='RGB' socket={socket}/>
		</div>
	);
}
 
export default Lights;