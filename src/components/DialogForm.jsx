/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class DialogForm extends Component {
    state = { quote: this.props.quote };

    handleChange = (e) => {
        this.setState({
            quote: {
                ...this.state.quote,
                text: e.target.value,
            },
        });
    };

    render() {
        const {
            modalIsOpen,
            onHide,
            onSave,
            title,
            type,
        } = this.props;

        const btnText = (type === 1 ? 'Сохранить' : 'OK');
        const message = (type === 1
            ? (<textarea
                autoFocus
                onChange={this.handleChange}
                className="form-control"
                rows="3"
                defaultValue={this.state.quote.text}
            />)
            : <div>{this.state.quote.text}</div>);

        return (
            <div className="static-modal">
                <Modal show={modalIsOpen} onHide={onHide}>
                    <Modal.Header>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {message}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className="modal-button"
                            onClick={onSave(this.state.quote)}
                            bsStyle="primary"
                            type="submit"
                        >
                            {btnText}
                        </Button>
                        <Button className="modal-button" onClick={onHide}>Отмена</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

DialogForm.propTypes = {
    quote: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
    })
        .isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
};

export default DialogForm;
