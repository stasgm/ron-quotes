import { ADD_QUOTE, EDIT_QUOTE, DELETE_QUOTE, CLEAR_QUOTES, SELECT_QUOTE, LOAD_QUOTES } from "../constants";
import shortid from 'shortid';

const initialState = [];

const quotes = (state = initialState, action) => {
    let quotes = null;

    switch(action.type){
        case ADD_QUOTE: {
            //console.log('add', action.quote.text);
            quotes = [
                ...state, {
                    id: shortid.generate(),
                    text: action.text,
                    selected: false,
                }];
            return quotes;
        }

        case DELETE_QUOTE:
            return state.filter(quote => quote.id !== action.id);

        case EDIT_QUOTE: {
            return state.map((item) => {
                //console.log('item.id=', item.id, ', action.quote.id', action.quote.quote);
                if (item.id !== action.quote.id) {
                    return item;
                }
                //console.log('text', action.quote.text);
                return {
                    ...item,
                    text: action.quote.text,
                };
            })
        }

        case CLEAR_QUOTES: return state=[];

        case SELECT_QUOTE:
            return state.map((item) => {
                if(item.id !== action.id)
                {
                    return item;
                }
                return {
                    ...item,
                    selected: !item.selected
                };
            });

        case LOAD_QUOTES:
            return action.quotes;

        default:
            return state;
    }
};

export default quotes;