import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

import Menu from './Menu'
import QuoteList from '../components/QuoteList'
import * as actions from '../actions'

const App = ({ quotes, actions }) => (
    <div className='App'>
        <div className='App-title'>Цитаты Рона Свонсона</div>
        <Menu quotes={quotes} actions={actions} />
        <QuoteList quotes={quotes} actions={actions} />
    </div>
);

const mapStateToProps = (state) => {
    return {quotes: state}
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);