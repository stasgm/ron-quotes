//Libraries
import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import DialogWindow from './dialogwindow'
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
        return(
            <ListGroup>
                {
                    this.props.quotes.map((text, id)=> (
                        <ListGroupItem className='quotes-item' key={id} /* href='#' onClick={this.handleToggle(value)}*/>
                            {text}
                            <div className='quotes-buttons'>
                                <button type="button" className="btn btn-default btn-sm quotes-button" onClick={this.props.onClick({id, text})}>
                                    <span className="glyphicon glyphicon-pencil" />
                                </button>
                                <button type="button" className="btn btn-default btn-sm quotes-button">
                                    <span className="glyphicon glyphicon-trash" />
                                </button>
                            </div>
                        </ListGroupItem>
                    ))
                }
            </ListGroup>
        )
    }
}

class QuotesList extends Component {
    state = {
        checked: [0],
        showModal: false,
        title: '',
        quote: {
            id: null,
            text: '',
        }
    };

    handleEdit = (quote) => () => {
        this.setState({
            title: 'Редактирование цитаты',
            showModal: true,
            quote,
        });
    };

    handleSave = (quoteVal) => () => {
         this.setState({
             showModal: false
        });

        this.props.onEdit(quoteVal);
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
                <QuoteList
                    quotes={this.props.list}
                    onClick={this.handleEdit}
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