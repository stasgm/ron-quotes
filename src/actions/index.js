import { ADD_QUOTE, DELETE_QUOTE, EDIT_QUOTE, CLEAR_QUOTES, SELECT_QUOTE, LOAD_QUOTES, DELETE_SELECTED_QUOTES } from '../constants';

export const addQuote = text => (
    {
        type: ADD_QUOTE,
        text,
    }
);

export const deleteQuote = id => (
    {
        type: DELETE_QUOTE,
        id,
    }
);

export const editQuote = quote => (
    {
        type: EDIT_QUOTE,
        quote,
    }
);

export const clearQuotes = () => (
    {
        type: CLEAR_QUOTES,
    }
);

export const selectQuote = id => (
    {
        type: SELECT_QUOTE,
        id,
    }
);

export const loadQuotes = quotes => (
    {
        type: LOAD_QUOTES,
        quotes,
    }
);

export const deleteSelectedQuotes = quotes => (
    {
        type: DELETE_SELECTED_QUOTES,
        quotes,
    }
);
