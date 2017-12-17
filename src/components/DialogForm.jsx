import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class DialogForm extends Component{
    state = {quote: this.props.quote} || {};

    handleChange = (e) => {
        this.setState({
            quote: {
                    ...this.state.quote,
                    text: e.target.value,
                }
        });
    };

    render() {
        let {
            modalIsOpen,
            onHide,
            onSave,
            title,
            type,
        } = this.props;

        const btnText = type === 1 ? 'Сохранить' : 'OK';

        return(
            <div className="static-modal">
                <Modal show={modalIsOpen} onHide={onHide}>
                    <Modal.Header>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {type === 1 ?
                            <textarea
                                autoFocus
                                onChange={this.handleChange}
                                className="form-control"
                                rows="3"
                                defaultValue={this.state.quote.text}
                            /> : <div>{this.state.quote.text}</div>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='modal-button' onClick={onSave(this.state.quote)} bsStyle="primary" type='submit'>{btnText}</Button>
                        <Button className='modal-button' onClick={onHide}>Отмена</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default DialogForm;
