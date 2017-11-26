//Libraries
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import QuotesList from './components/quotelist';
import DialogWindow from './components/dialogwindow'
// Styles
import './App.css';

class Quotes extends Component {
    constructor() {
        super();
        this.state = {
            quotes: [],
            addModal: {
                showModal: false,
                title: '',
                text: '',
                quote: {
                    text: '',
                    id: null,
                }
            }
        };
    }

    componentDidMount(){
        const savedQuotes = JSON.parse(localStorage.getItem('quotes'));

        if (savedQuotes) {
            this.setState({ quotes: savedQuotes });
        }
    }

    componentDidUpdate() {
        // const quotes = JSON.stringify(this.state.quotes);
        // localStorage.setItem('quotes', quotes);
    }

    handleLoadClick = () => {
        this.loadQuote();
    };

    handle10LoadClick = () =>{
        for(let i=0; i < 10; i++)
            this.loadQuote();
    };

    handleClearQuotes = () => {
        this.setState({
            quotes: []
        });
    };

    handleEditQuote = (quote) => {
        let newQuotes = this.state.quotes;
        newQuotes[quote.id] = quote.text ;
        this.setState({quotes: newQuotes});
    };

    handleDeleteQuote = (id) => {
        this.setState({
            quotes: this.state.quotes.filter((quote, i) => i !== id)
        })
    };

    handleSaveQuotes = () => {
        const quotes = JSON.stringify(this.state.quotes);
        localStorage.setItem('quotes', quotes);
    };

    loadQuote(){
        /* Загружает цитату Рона Свонсона */
        let URL = 'http://ron-swanson-quotes.herokuapp.com/v2/quotes';

        fetch(URL, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                this.setState({quotes: [...this.state.quotes, json[0]]});
            }).catch(function(error) {
                console.log('There has been a problem with fetch operation: ' + error.message);
                //this.setState({state: 'There has been a problem with fetch operation: ' + error.message})
        })
    }

    handleAddQuoteModal = () => {
        console.log("Вызов handleAddQuoteModal");
        this.setState({
            addModal: {
                showModal: true,
                title: 'Введите новую цитату',
                quote: {
                    text: '',
                    id: null,
                }
            }
        });
    };

    handleAddQuote = (quote) => () => {
        console.log("Вызов handleAddQuote", quote);
        this.setState({quotes: [...this.state.quotes, quote.text], addModal: {...this.state.addModal, showModal: false}});

    };

    render() {
        return (
            <div className='App'>
                <div className='App-title'>Цитаты Рона Свонсона</div>
                <div className='form-quote'>
                    <Button className='button-quote button' onClick={this.handleAddQuoteModal}>
                        Добавить цитату
                    </Button>
                    <Button className='button-quote button' onClick={this.handleLoadClick}>
                        Загрузить цитату
                    </Button>
                    <Button className='button-quote button' onClick={this.handle10LoadClick}>
                        Загрузить 10 цитат
                    </Button>
                    <Button className='button-clear button' onClick={this.handleClearQuotes}>
                        Очистить
                    </Button>
                    <Button className='button-save button' onClick={this.handleSaveQuotes}>
                        Сохранить
                    </Button>
                    <QuotesList list={this.state.quotes} onEdit={this.handleEditQuote} onDelete={this.handleDeleteQuote}/>

                    <DialogWindow
                        {...this.state.addModal}
                        onClose={() => this.setState({addModal: {...this.state.addModal, showModal: false}})}
                        onSave={this.handleAddQuote}
                    />
                </div>
            </div>
        );
    }
}

Quotes.propTypes = {};


/* TODO
    +1) Сделать сохранение цитат в localstorage
    + 2) При открытии загружать цитаты из localstorage
    3) Статус - цитата сохранена в хранилище или нет (цветов выделять строки)
    + 4) Кнопка 'добавить свою цитату'
 */

export default Quotes;