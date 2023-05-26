import { Button, ButtonGroup, ToggleButton, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

const Room = (props) => {
    const [modalShow, setModalShow] = useState(false);


    const [LED, setLED] = useState({
		mode : "1",
		brightness : 0,
	})
        
    const [radioValue, setRadioValue] = useState('1');
      
    const radios = [
        { name: 'OFF', value: '0' },
        { name: 'ON', value: '1' },
        { name: 'SENSOR', value: '2' },
    ];

	const socket = props.socket;
    socket.on(props.title+'LEDBrightness',(brightness)=>
    {
		brightness = parseInt(brightness);
        console.log(`recieved ${props.title}brightness: ` + brightness)
        setLED({
			...LED,
			brightness
		})
    })

	socket.on(props.title+'LEDMode',(mode)=>
    {
        console.log(`recieved ${props.title}mode: ` + mode)
        setLED({
			...LED,
			mode
		})
		
    })

	const sendReq = async () =>{
        console.log("sent")
		socket.emit(props.title+'LEDBrightness', LED.brightness);
		socket.emit(props.title+'LEDMode', LED.mode.toString());
	}


	const handleMode = (e) => {
		console.log("mode changed to " + e.target.value)
		setLED({...LED,'mode': e.target.value})
		// sendReq();
	}

    const handlebrightness = async (e) => {
		if(e.target.name === "brightness"){
			setLED({...LED,'brightness': e.target.value * 2})
		}else if (e.target.name === "brighter"){
			if(LED.brightness < 16) setLED({...LED,'brightness': (parseInt(LED.brightness)+2)})
		}else if (e.target.name === "darker"){
			if(LED.brightness > 0) setLED({...LED,'brightness': (parseInt(LED.brightness)-2)})
		}
		console.log(LED)
		// sendReq();
	}

    return ( 
        <>
            
            <div className="roomTitle" onClick={()=>setModalShow(true)}><b className='roomText'>{props.title.replace(props.title[0], props.title[0].toUpperCase())}</b><br/><p className='roomValues'>Mode: {LED.mode} </p><p className='roomValues'>Brightness: {LED.brightness}</p></div>
            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                onHide={()=>setModalShow(false)}
                centered
                style={{textAlign:'center'}}
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ButtonGroup style={{display:"inline-block"}}>
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
                </ButtonGroup>
                    <div className="brightnessControls my-5">
                        <Button variant="primary" className='mx-2' onClick={handlebrightness} name='darker' style={{display:"inline-block"}}>-</Button>
                            <input type='range' name='brightness' value={LED.brightness/2 || 0} min='0' max='8' onChange={handlebrightness}/>
                        <Button variant="primary" className='mx-2' onClick={handlebrightness} name='brighter'>+</Button>
                    </div>
                <Button variant='danger' onClick={sendReq} style={{width: "20rem", height:"5rem"}}>APPLY</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>setModalShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

        </> 
    );
}
 
export default Room;