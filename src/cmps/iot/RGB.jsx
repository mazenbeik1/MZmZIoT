import { Button, ButtonGroup, ToggleButton, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

const RGB = (props) => {
    const [modalShow, setModalShow] = useState(false);


    const [LED, setLED] = useState({
		mode : "1",
		R : 0,
        G : 0,
        B : 0,
	})
        
    const [radioValue, setRadioValue] = useState('1');
      
    const radios = [
        { name: 'OFF', value: '0' },
        { name: 'ON', value: '1' },
        { name: 'SENSOR', value: '2' },
    ];

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

	const socket = props.socket;
    socket.on('RLEDBrightness',(R)=>
    {
        R = parseInt(R);
        console.log("recieved R: " +R)
        setLED({
			...LED,
			R
		})
    })

    socket.on('GLEDBrightness',(G)=>
    {
        G = parseInt(G);
        console.log("recieved G: " +G)
        setLED({
			...LED,
			G
		})
    })

    socket.on('BLEDBrightness',(B)=>
    {
        B = parseInt(B);
        console.log("recieved B: " + B)
        setLED({
			...LED,
			B
		})
    })

	socket.on('RGBLEDMode',(mode)=>
    {
        console.log("recieved RGBMODE: " + mode);
        setLED({
			...LED,
			mode
		})
		
    })

	const sendReq = async () =>{
        console.log(LED.R.toString())
		// socket.emit('RGBLEDMode', LED.mode.toString());
		socket.emit('RLEDBrightness', LED.R.toString());
        await sleep(100);
        socket.emit('GLEDBrightness', LED.G.toString());
        socket.emit('BLEDBrightness', LED.B.toString());
	}


	const handleMode = (e) => {
		console.log("mode changed to " + e.target.value)
		setLED({...LED,'mode': e.target.value})
		// sendReq();
	}

    const handlebrightness = async (e) => {
		if(e.target.name === "brightness"){
			setLED({...LED,[e.target.id]: e.target.value * 2})
		}else if (e.target.name === "brighter"){
			if(LED.brightness < 16) setLED({...LED,[e.target.id]: (parseInt(LED.brightness)+2)})
		}else if (e.target.name === "darker"){
			if(LED.brightness > 0) setLED({...LED,[e.target.id]: (parseInt(LED.brightness)-2)})
		}
		console.log(LED)
		// sendReq();
	}

    return ( 
        <>
            
            <div className="roomTitle" onClick={()=>setModalShow(true)}>
                <b className='roomText'>{props.title.replace(props.title[0], props.title[0].toUpperCase())}</b>
                <br/>
                {/* <p className='roomValues'>Mode: {LED.mode} </p>
                <br /> */}
                <p className='roomValues'>Red: {LED.R}</p>
                <p className='roomValues'>Green: {LED.G}</p>
                <p className='roomValues'>Blue: {LED.B}</p>
            </div>
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
                    <div className="brightnessControls my-5">
                        R
                        <br />
                        <Button variant="primary" className='mx-2' onClick={handlebrightness} name='darker' style={{display:"inline-block"}} id='R'>-</Button>
                            <input type='range' name='brightness' value={LED.R/2 || 0} min='0' max='8' onChange={handlebrightness} id='R'/>
                        <Button variant="primary" className='mx-2' onClick={handlebrightness} name='brighter' id='R'>+</Button>
                    </div>
                    <div className="brightnessControls my-5">
                        G
                        <br />
                        <Button variant="primary" className='mx-2' onClick={handlebrightness} name='darker' id='G' style={{display:"inline-block"}}>-</Button>
                            <input type='range' name='brightness' value={LED.G/2 || 0} min='0' max='8' id='G' onChange={handlebrightness}/>
                        <Button variant="primary" className='mx-2' onClick={handlebrightness} name='brighter' id='G'>+</Button>
                    </div>
                    <div className="brightnessControls my-5">
                        B
                        <br />
                        <Button variant="primary" className='mx-2' onClick={handlebrightness} name='darker' style={{display:"inline-block"}} id='B'>-</Button>
                            <input type='range' name='brightness' value={LED.B/2 || 0} min='0' max='8' onChange={handlebrightness} id='B'/>
                        <Button variant="primary" className='mx-2' onClick={handlebrightness} name='brighter' id='B'>+</Button>
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
 
export default RGB;