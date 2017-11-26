import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class DialogDeleteQuote extends Component{
    render(){
        let {
            showDeleteModal,
            onClose,
            onOk,
            title,
            quote,
        } = this.props;

        return(
            <div className="static-modal">
                <Modal show={showDeleteModal} onHide={onClose}>
                    <Modal.Header>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {quote.text}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onOk(quote.id)}>Да</Button>
                        <Button bsStyle="primary" onClick={onClose}>Нет</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default DialogDeleteQuote;