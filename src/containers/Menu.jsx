import React, { Component } from 'react';
import DialogForm from '../components/DialogForm'
import { ButtonGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap';

class Menu extends Component{
    state = {
        modal: {
            type: null,
            isOpen: false,
            quote: {
                id: null,
                text: ''
            },
            title: '',
            text: '',
        }
    };

    handleAddQuote = () => {
        // Настройка модального окна
        this.setState({
            modal: {
                ...this.state.modal,
                title: 'Добвление новой цитаты',
                type: 1,
                quote: {
                    id: null,
                    text: '',
                },
                isOpen: true,
                onSave: this.handleModalSaveClicked,
            }
        });
    };

    closeModal = () => this.setState({modal: {...this.state.modal, isOpen: false}});

    handleModalSaveClicked = (quote) => () => {
        if (quote.text > '') this.props.actions.addQuote(quote.text);
        this.closeModal();
    };

    loadQuote(){
        /* Загружает цитату Рона Свонсона */
        let URL = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

        fetch(URL, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                this.props.actions.addQuote(json[0]);
                //this.setState({quotes: [...this.state.quotes, {text: json[0], isActive: true}]});

            }).catch(function(error) {
            console.log('There has been a problem with fetch operation: ' + error.message);
            //this.setState({state: 'There has been a problem with fetch operation: ' + error.message})
        })
    }

    handleLoadClick = () => {
        this.loadQuote();
    };

    handle10LoadClick = () =>{
        for(let i=0; i < 10; i++)
            this.loadQuote();
    };

    handleSaveQuotes = () => {
        const quotes = JSON.stringify(this.props.quotes);
        localStorage.setItem('quotes', quotes);
    };

    render(){
        return(
            <div className="form-menu">
                {this.state.modal.isOpen
                ?
                <DialogForm
                    {...this.state.modal}
                    modalIsOpen={this.state.modal.isOpen}
                    onHide={this.closeModal}
                    onSave={this.handleModalSaveClicked}
                /> : null }
                <ButtonGroup className="menu-button-group">
                    <DropdownButton title="Добавить" className='button'>
                        <MenuItem className="button-add-quote button" onClick={this.handleAddQuote}>
                            Добавить цитату
                        </MenuItem>
                        <MenuItem className='button-load-quote button' onClick={this.handleLoadClick} >
                            Загрузить цитату
                        </MenuItem>
                        <MenuItem  className='button-load10-quote button' onClick={this.handle10LoadClick} >
                            Загрузить 10 цитат
                        </MenuItem>
                    </DropdownButton>
                    <DropdownButton title="Удалить" className='button'>
                        <MenuItem className='button-clear-all button' onClick={this.props.actions.clearQuotes} >
                            Все цитаты
                        </MenuItem>
                        <MenuItem className='button-clear-selected button' onClick={this.props.actions.deleteSelectedQuotes} >
                            Отмеченные
                        </MenuItem>
                    </DropdownButton>
                    <Button className='button-save button' onClick={this.handleSaveQuotes} >
                        Сохранить
                    </Button>
                    <Button className='button-load-quotes button' onClick={this.props.actions.loadQuotes} >
                        Загрузить
                    </Button>
                    <Button className='button-ron-swanson button' onClick={()=> window.open("https://www.google.com/search?q=ron+swanson", "_blank")} >
                        Рон Свонсон
                    </Button>
                </ButtonGroup>
            </div>
        )
    }
}


export default Menu;