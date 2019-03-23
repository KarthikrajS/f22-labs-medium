import React from 'react';
import {Modal,Button} from 'react-bootstrap';


class PopUp extends React.Component{

    render(){
        const {confirmDelete} = this.props;
        return(
            <div className='popup'>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Sure want to delete the item?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary"  onClick={this.props.closePopup}>Close</Button>
                        <Button variant="primary" onClick={confirmDelete }>Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

export default PopUp;