import { useState } from "react";
import { Card } from "react-bootstrap";

const Temperature = (props) => {

    const [state, setState] = useState("24 C")

    const socket = props.socket;
    socket.on('Temp',(temp)=>
    {
        setState(temp.toString()+' C')
    })


    return ( 
        <div className="Temperature" style={{textAlign: "center", borderColor: "black"}}>
            <Card bg={parseInt(state)<10? 'info': parseInt(state)>=30? 'danger' : 'success'} border="dark my-5" style={{ width: '20rem', display:"inline-block"}}>
                <Card.Header>{state}</Card.Header>
                {/* <Card.Body>
                <Card.Title>{state}</Card.Title>
                </Card.Body> */}
            </Card>
            
            {/* <h3 style={{textAlign: "center", borderColor: "black"}}></h3> */}
        </div>
     );
}
 
export default Temperature;