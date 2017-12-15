import React from 'react';
import PropTypes from 'prop-types';

import { ListGroupItem } from 'react-bootstrap';

const Quote = ({ onEdit, onDelete, onSelect, quote:  quoteItem}) => (
    <ListGroupItem className={`quotes-item animated fadeInUp ${quoteItem.selected? 'selected-item': null}`}>
        <div className='quote-text' onClick={() => onSelect(quoteItem.id)}>{quoteItem.text} </div>
        <div className='quotes-buttons'>
            <button type="button" className="btn btn-default btn-sm quotes-button" onClick={onEdit(quoteItem)}>
                <span className="glyphicon glyphicon-pencil" />
            </button>
            <button type="button" className="btn btn-default btn-sm quotes-button" onClick={onDelete(quoteItem)}>
                <span className="glyphicon glyphicon-trash" />
            </button>
        </div>
    </ListGroupItem>
);

Quote.propTypes = {
    quote: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default Quote;
