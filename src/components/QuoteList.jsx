import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

import DialogForm from '../components/DialogForm';
import Quote from './Quote';

class QuoteList extends Component {
    state = {
        modal: {
            type: null,
            isOpen: false,
            quote: {
                id: '',
                text: '',
            },
            title: '',
            onSave: null,
        },
    };

    componentDidMount() {
        this.props.actions.loadQuotes();
    }


    handleEditQuote = quote => () => {
        this.closeModal();
        this.props.actions.editQuote(quote);
    };

    handleEditQuoteDialog = quote => () => {
        // Настройка модального окна
        this.setState({
            modal: {
                ...this.state.modal,
                title: 'Измените цитату',
                quote,
                type: 1,
                isOpen: true,
                onSave: this.handleEditQuote,
            },
        });
    };

    handleDeleteQuote = quote => () => {
        this.closeModal();
        this.props.actions.deleteQuote(quote.id);
        this.setState({});
    };

    handleDeleteQuoteDialog = quote => () => {
        // Настройка модального окна
        this.setState({
            modal: {
                ...this.state.modal,
                title: 'Удалить цитату?',
                quote,
                type: 0,
                isOpen: true,
                onSave: this.handleDeleteQuote,
            },
        });
    };

    handleSelectQuote = id => () => {
        this.props.actions.selectQuote(id);
    };

    closeModal = () => this.setState({ modal: { ...this.state.modal, isOpen: false } });

    render() {
        const {
            quotes,
        } = this.props;

        return (
            <div>
                {this.state.modal.isOpen
                    ? <DialogForm
                        {...this.state.modal}
                        modalIsOpen={this.state.modal.isOpen}
                        onHide={this.closeModal}
                    /> : null}
                <ListGroup className="quotes-group">
                    {quotes.map(item => (
                        <Quote
                            onDelete={this.handleDeleteQuoteDialog}
                            onEdit={this.handleEditQuoteDialog}
                            onSelect={this.handleSelectQuote}
                            quote={item}
                            key={item.id}
                        />
                    ))
                    }
                </ListGroup>
            </div>
        );
    }
}

QuoteList.propTypes = {
    quotes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
    })).isRequired,
    actions: PropTypes.shape({
        loadQuotes: PropTypes.func.isRequired,
        editQuote: PropTypes.func.isRequired,
        deleteQuote: PropTypes.func.isRequired,
        selectQuote: PropTypes.func.isRequired,
    }).isRequired,
};

export default QuoteList;
