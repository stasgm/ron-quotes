//Libraries
import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import DialogWindow from './dialogwindow'
import DialogDeleteQuote from './dialogdeletequote'
// Styles
import '../App.css';

class QuoteList extends Component {
    handleToggle = value => () => {
        /*
        const {checked} = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
        */
    };

    render(){
        let isDisabled = false;
        return(
            <ListGroup>
                {
                    this.props.quotes.map((quote, id)=> {
                        if (!quote.isActive) isDisabled = true;
                        return(
                        <ListGroupItem className={`quotes-item animated ${!quote.isActive ? 'fadeOutDown disabled': isDisabled ? '': ('fadeInUp enabled')}`} key={id} >
                            {quote.text}
                            <div className='quotes-buttons'>
                                <button type="button" className="btn btn-default btn-sm quotes-button" onClick={this.props.onEdit({id, text: quote.text})}>
                                    <span className="glyphicon glyphicon-pencil" />
                                </button>
                                <button type="button" className="btn btn-default btn-sm quotes-button" onClick={this.props.onDelete({id, text: quote.text})}>
                                    <span className="glyphicon glyphicon-trash" />
                                </button>
                            </div>
                        </ListGroupItem>
                    )}
                    )
                }
            </ListGroup>
        )
    }
}

class QuotesList extends Component {
    state = {
        checked: [0],
        showModal: false,
        showDeleteModal: false,
        title: '',
        quote: {
            id: null,
            text: '',
            isActive: true,
        }
    };

    handleOnEdit = (quote) => () => {
        this.setState({
            title: 'Редактирование цитаты',
            showModal: true,
            quote,
        });
    };

    handleSave = (quote) => () => {
         this.setState({
             showModal: false
        });

        this.props.onEdit(quote);
    };

    handleOnDelete = (quote) => () => {
        this.setState({
            title: 'Редактирование цитаты',
            showDeleteModal: true,
            quote,
        });
    };

    handleOk = (id) => () => {
        console.log('delete');
        this.setState({
            showDeleteModal: false,
        });
        this.props.onDelete(id);
    };

    render(){
        return(
            <div className='quotes-group'>
                <DialogWindow
                    showModal={this.state.showModal}
                    title={this.state.title}
                    quote={this.state.quote}
                    onClose={() => this.setState({showModal: false})}
                    onSave={this.handleSave}
                />
                <DialogDeleteQuote
                    showDeleteModal={this.state.showDeleteModal}
                    title='Вы действительно хотите удалить цитату?'
                    quote={this.state.quote}
                    onClose={() => this.setState({showDeleteModal: false})}
                    onOk={this.handleOk}
                />
                <QuoteList
                    quotes={this.props.quotes}
                    onEdit={this.handleOnEdit}
                    onDelete={this.handleOnDelete}
                />
            </div>
        )
    }
}

/* TODO
    1) Добавление метода close для закртия диалогового окна
    2) Обнуление состояния для диалогового окна
    3) Вызов закрытия окна после сохранения
 */
export default QuotesList;