import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


class DialogWindow extends Component{
    state = {
        quote: {
            id: null,
            text: '',
        }
    };

    handleChange = (e) => {
        this.setState({
            quote:
                {
                    id: this.props.quote.id,
                    text: e.target.value,
                }
        });
    };

    render(){
        let {
            showModal,
            onClose,
            title,
            quote,
            onSave,
        } = this.props;

        return(
            <div className="static-modal">
                <Modal show={showModal} onHide={onClose}>
                    <Modal.Header>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/*<FormControl*/}
                            {/*autoFocus*/}
                            {/*type="text"*/}
                            {/*defaultValue={quote.text}*/}
                            {/*placeholder="Цитата"*/}
                            {/*onChange={this.handleChange}*/}
                        {/*/>*/}
                        <textarea
                            autoFocus
                            onChange={this.handleChange}
                            className="form-control"

                            rows="2"
                            defaultValue={quote.text}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onClose}>Close</Button>
                        <Button onClick={onSave(this.state.quote)} bsStyle="primary" type='submit'>Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default DialogWindow;
