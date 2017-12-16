import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class DialogForm extends Component{
    state = {
        quote: {
            id: null,
            text: '',
        }
    };

    handleChange = (e) => {
        this.setState({
            quote: {
                    ...this.state.quote,
                    id: this.props.quote.id,
                    text: e.target.value,
                }
        });
    };

    render() {
        let {
            modalIsOpen,
            onHide,
            title,
            quote,
            type,
            onSave,
        } = this.props;

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
                                defaultValue={quote.text}
                            /> : <div>{quote.text}</div>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='modal-button' onClick={onSave(type === 1 ? this.state.quote : this.props.quote)} bsStyle="primary" type='submit'>{type === 1 ? 'Сохранить' : 'OK'}</Button>
                        <Button className='modal-button' onClick={onHide}>Отмена</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default DialogForm;
