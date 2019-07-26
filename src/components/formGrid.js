import React, { Component } from 'react';
import FormRow from './formRow.js';
import searchResultsService from '../controllers/searchResultsService.js';

class FormGrid extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.state = { searchQueryTerms: [{ artist: '', song: '' }, { artist: '', song: '' }] };
        this.onEditForm = this.onEditForm.bind(this);
        this.checkForEnter = this.checkForEnter.bind(this);
    }

    async search() {
        const results = await searchResultsService.getSearchResults(this.state.searchQueryTerms);
        this.props.setResults(results);
    }

    onEditForm(index, updatedFormRow) {
        let searchQueryTerms = this.state.searchQueryTerms;
        searchQueryTerms[index] = updatedFormRow;
        this.setState({ searchQueryTerms: searchQueryTerms });
    }

    checkForEnter(event) {
        if (event.keyCode === 13) {
            this.search();
        }
    }

    render() {

        const forms = this.state.searchQueryTerms.map((formRow, index)=>
            <FormRow artist={formRow.artist} song={formRow.song} index={index} onEditForm={this.onEditForm} key={index}/>);
        return (
            <div onKeyUp={this.checkForEnter}>
                <div>{forms}</div>
                <button onClick={this.search}>Search</button>
            </div>
        );
    }
}

export default FormGrid;