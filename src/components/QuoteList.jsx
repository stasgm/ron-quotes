import React, { Component } from 'react';

import DialogForm from '../components/DialogForm'
import Quote from './Quote';

import { ListGroup } from 'react-bootstrap';

class QuoteList extends Component{
    state = {
        modal: {
            type: null,
            isOpen: false,
            quote: {
                id: null,
                text: ''
            },
            title: '',
            onSave: null,
        }
    };

    componentDidMount(){
        this.props.actions.loadQuotes();
    }


    handleEditQuote = (quote) => () => {
        this.closeModal();
        this.props.actions.editQuote(quote);
    };

    handleEditQuoteDialog = (quote) => () => {
        // Настройка модального окна
        this.setState({
            modal: {
                ...this.state.modal,
                title: 'Измените цитату',
                quote,
                type: 1,
                isOpen: true,
                onSave: this.handleEditQuote,
            }
        });
    };

    handleDeleteQuote = (quote) => () => {
        this.closeModal();
        this.props.actions.deleteQuote(quote.id);
        this.setState({});
    };

    handleDeleteQuoteDialog = (quote) => () => {
        // Настройка модального окна
        this.setState({
            modal: {
                ...this.state.modal,
                title: 'Удалить цитату?',
                quote,
                type: 0,
                isOpen: true,
                onSave: this.handleDeleteQuote,
            }
        });
    };

    closeModal = () => this.setState({modal: {...this.state.modal, isOpen: false}});

    render() {
        let {
            actions,
            quotes
        } = this.props;

        return(
            <div>
                {this.state.modal.isOpen
                    ?
                    <DialogForm
                        {...this.state.modal}
                        modalIsOpen={this.state.modal.isOpen}
                        onHide={this.closeModal}
                    /> : null}
                <ListGroup className='quotes-group'>
                    {quotes.map((quote) => {
                            return (
                                <Quote
                                    onDelete={this.handleDeleteQuoteDialog}
                                    onEdit={this.handleEditQuoteDialog}
                                    onSelect={actions.selectQuote}
                                    quote={quote}
                                    key={quote.id}
                                />
                            );
                        }
                    )}
                </ListGroup>
            </div>
        )
    }
}

export default QuoteList;