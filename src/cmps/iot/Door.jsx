import { useState } from "react";
import { Card } from "react-bootstrap";
const Door = (props) => {
    const [state, setState] = useState({
        logs: []
    })

    const socket = props.socket;
    socket.on('doorOpened',(msg)=>
    {
        let newLogs = state.logs;
        newLogs.push(`Opened: ${msg.toString()}`);
        newLogs = [...new Set(newLogs)];
        setState({
            ...state,
            logs: newLogs
        })
    })

    socket.on('doorClosed',(msg)=>
    {
        let newLogs = state.logs;
        newLogs.push(`Closed: ${msg.toString()}`);
        newLogs = [...new Set(newLogs)];
        setState({
            ...state,
            logs: newLogs
        })

        console.log('door closed')
    })

    return ( 
        
        <div className="Door" style={{textAlign: "center"}}>
            <Card border="dark my-5" style={{ width: '20rem', display:"inline-block"}}>
                <Card.Header>Logs</Card.Header>
                <Card.Body>
                {(state.logs).map(log=>{
                    return (<Card.Text>{log.split('T')[0]} {log.split('T')[1].split(':')[0]} {log.split('T')[1].split(':')[1]}</Card.Text>)
                })}
                </Card.Body>
            </Card>
        </div>
     );
}
 
export default Door;