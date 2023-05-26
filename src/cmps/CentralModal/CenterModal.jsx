import { Modal, Button } from "react-bootstrap";

function CenterModal(props) {

    let ModalBody = () =>{
        
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="ModalBody">
                    <video controls width="100%" height="60%">
                        <source type="video/mp4" src={props.intropath} />
                    </video>    
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
  }

export default CenterModal;
  