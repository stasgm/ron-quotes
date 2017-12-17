import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Menu from './Menu';
import QuoteList from '../components/QuoteList';
import * as actions from '../actions';

const App = ({ quotes, actions }) => (
    <div className="App">
        <div className="App-title">Цитаты Рона Свонсона</div>
        <Menu quotes={quotes} actions={actions} />
        <QuoteList quotes={quotes} actions={actions} />
    </div>
);

const mapStateToProps = state => ({ quotes: state });

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

App.propTypes = {
    quotes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
    })).isRequired,
    actions: PropTypes.shape({
        addQuote: PropTypes.func.isRequired,
        loadQuotes: PropTypes.func.isRequired,
        clearQuotes: PropTypes.func.isRequired,
        deleteSelectedQuotes: PropTypes.func.isRequired,
    }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
