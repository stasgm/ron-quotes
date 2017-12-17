import React from 'react';
import PropTypes from 'prop-types';

import { ListGroupItem } from 'react-bootstrap';

const Quote = ({
    onEdit, onDelete, onSelect, quote,
}) => (
    <ListGroupItem className={`quotes-item animated fadeInUp ${quote.selected || 'selected-item'}`}>
        <div className="quote-text" onClick={onSelect(quote.id)}>{quote.text} </div>
        <div className="quotes-buttons">
            <button type="button" className="btn btn-default btn-sm quotes-button" onClick={onEdit(quote)}>
                <span className="glyphicon glyphicon-pencil" />
            </button>
            <button type="button" className="btn btn-default btn-sm quotes-button" onClick={onDelete(quote)}>
                <span className="glyphicon glyphicon-trash" />
            </button>
        </div>
    </ListGroupItem>
);

Quote.propTypes = {
    quote: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default Quote;
