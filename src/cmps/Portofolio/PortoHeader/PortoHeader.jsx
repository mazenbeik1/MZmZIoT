import { Image } from "react-bootstrap";
import TimeLine from "./TimeLine";
import { CircularProgress, ImageListItemBar } from "@mui/material";
import { SocialIcon } from "react-social-icons";
const PortoHeader = () => {

    

    return ( 
        <>
            <div className="header" >
                <Image src="/imgs/cldTrans.png" className="cloud"></Image>
                <Image className="avatar" src="/imgs/muscles-blurred.png" roundedCircle/>
                <br />
                <div className="title">
                    <h1 className="name">Mazen Elbeik</h1> <br/> <p className="profeciency"><strong>MERN STACK DEVELOPER & IoT ENGINEER</strong></p>
                </div>
                <TimeLine/>
                <br />
                <CircularProgress color="inherit"/>
                <p>PORTFOLIO IS UNDER CONSTRUCTION</p>
                <br />

                <a href="https://www.linkedin.com/in/mazen-elbeik-764877272/" target={'_blank'}>
                <button type="button" className="fab btn btn-link btn-floating mx-1 portoLink" id='fab-fb'>
                    <SocialIcon network="linkedin" className="portoLink"/>
                </button>
                </a>
                <a href="https://github.com/mazenbeik1" target={'_blank'}>
                <button type="button" className="fab btn btn-link btn-floating mx-1 portoLink" id='fab-fb'>
                    <SocialIcon network="github" className="portoLink"/>
                </button>
                </a>
            </div>
        </>
     );
}
 
export default PortoHeader;