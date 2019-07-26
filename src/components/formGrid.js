import React, { Component } from 'react';
import FormRow from './formRow.js';
import searchResultsService from '../controllers/searchResultsService.js';

class FormGrid extends Component {
    constructor(props) {
        super(props);
        this.formId = 0; 

        this.state = { searchQueryTerms: [{ id: this.formId, artist: '', song: '' }] };

        this.search = this.search.bind(this);
        this.onEditForm = this.onEditForm.bind(this);
        this.checkForEnter = this.checkForEnter.bind(this);
        this.onAddFormRow = this.onAddFormRow.bind(this);
        this.onDeleteFormRow = this.onDeleteFormRow.bind(this);
    }

    componentDidMount() {
        this.onAddFormRow();
    }

    async search() {
        const results = await searchResultsService.getSearchResults(this.state.searchQueryTerms);
        this.props.setResults(results);
    }

    onEditForm(index, updatedFormRow) {
        let searchQueryTerms = this.state.searchQueryTerms.slice();
        searchQueryTerms[index] = updatedFormRow;
        this.setState({ searchQueryTerms: searchQueryTerms });
    }

    checkForEnter(event) {
        if (event.keyCode === 13) {
            this.search();
        }
    }

    onAddFormRow() {
        let searchQueryTerms = this.state.searchQueryTerms.slice();
        if (searchQueryTerms.length < 10) {
            this.formId++;
            searchQueryTerms.push({ id: this.formId, artist: '', song: '' });
            this.setState({ searchQueryTerms: searchQueryTerms });
        }
    }

    onDeleteFormRow(index) {
        let searchQueryTerms = this.state.searchQueryTerms.slice();
        searchQueryTerms.splice(index, 1);
        this.setState({ searchQueryTerms: searchQueryTerms });
    }

    render() {
        const forms = this.state.searchQueryTerms.map((formRow, index) =>
            <FormRow artist={formRow.artist}
                song={formRow.song} index={index}
                onEditForm={this.onEditForm}
                onDelete={this.onDeleteFormRow}
                id={formRow.id}
                key={formRow.id} />);
        return (
            <div onKeyUp={this.checkForEnter}>
                <div>{forms}</div>
                <button onClick={this.onAddFormRow}>Add Another Song</button>
                <button onClick={this.search}>Search</button>
            </div>
        );
    }
}

export default FormGrid;