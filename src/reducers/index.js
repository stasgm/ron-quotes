import shortid from 'shortid';
import { ADD_QUOTE, EDIT_QUOTE, DELETE_QUOTE, CLEAR_QUOTES, DELETE_SELECTED_QUOTES, SELECT_QUOTE, LOAD_QUOTES } from '../constants';

const initialState = [];

const quotes = (state = initialState, action) => {
    switch (action.type) {
    case ADD_QUOTE: {
        return [
            ...state,
            {
                id: shortid.generate(),
                text: action.text,
                selected: false,
            },
        ];
    }

    case DELETE_QUOTE:
        return state.filter(quote => quote.id !== action.id);

    case EDIT_QUOTE: {
        return state.map(item => (
            item.id !== action.quote.id
                ? item
                : { ...item, text: action.quote.text }
        ));
    }

    case CLEAR_QUOTES: return initialState;

    case SELECT_QUOTE: {
        return state.map(item => (
            item.id !== action.id
                ? item
                : { ...item, selected: !item.selected }
        ));
    }

    case LOAD_QUOTES: {
        const savedQuotes = JSON.parse(localStorage.getItem('quotes'));
        return savedQuotes || state;
    }

    case DELETE_SELECTED_QUOTES:
        return state.filter(quote => !quote.selected);

    default:
        return state;
    }
};

export default quotes;
