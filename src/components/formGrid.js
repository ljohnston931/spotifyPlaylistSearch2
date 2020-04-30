import React, { Component } from 'react';
import FormRow from './formRow.js';
import searchResultsService from '../controllers/searchResultsService.js';
import ReactGA from 'react-ga';


class FormGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQueryTerms: [{ id: 0, artist: '', song: '' }]};
        this.formId = 1;

        this.search = this.search.bind(this);
        this.onEditForm = this.onEditForm.bind(this);
        this.checkForEnter = this.checkForEnter.bind(this);
        this.onAddFormRow = this.onAddFormRow.bind(this);
        this.onDeleteFormRow = this.onDeleteFormRow.bind(this);
        this.openTipsModal = this.openTipsModal.bind(this);
        this.logSearch = this.logSearch.bind(this);
    }

    componentDidMount() {
        this.onAddFormRow();
    }

    async search() {
        const results = await searchResultsService.getSearchResults(this.state.searchQueryTerms);
        this.props.setResults(results);
        this.logSearch(this.state.searchQueryTerms);

        // Scroll down to results
        var elmnt = document.getElementById("report");
        elmnt.scrollIntoView({behavior: "smooth"});
    }

    logSearch(searchQueryTerms) {
        const searchString = searchQueryTerms.toString();
        ReactGA.event({
            category: 'Search',
            action: 'Click',
            label: searchString
        });
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
            searchQueryTerms.push({ id: this.formId, artist: '', song: '' });
            this.formId++;
            this.setState({ searchQueryTerms: searchQueryTerms });
        }
    }

    onDeleteFormRow(index) {
        let searchQueryTerms = this.state.searchQueryTerms.slice();
        if (index < 2) {
            searchQueryTerms[index].artist = '';
            searchQueryTerms[index].song = '';
            searchQueryTerms[index].id = this.formId;
            this.formId++;
        } else {
            searchQueryTerms.splice(index, 1);
        }
        this.setState({ searchQueryTerms: searchQueryTerms });
    }

    openTipsModal() {
        const tips =
            <ul>
                <li>Try searching for 2-3 of your favorite artists without song titles.</li>
                <li>Then add song titles one by one to narrow your search.</li>
                <li>Press tab to move to next field. Press enter to search.</li>
            </ul>;
        this.props.openModal('TIPS', <div>{tips}</div>);
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
                    <p>What are you in the mood to listen to?<span className='tipsButton changeOnHover' onClick={this.openTipsModal} >Tips</span></p>
                <div>{forms}</div>
                <button className="pill" onClick={this.onAddFormRow}>Add Another Song</button>
                <button className="pill" onClick={this.search}>Search</button>
            </div>
        );
    }
}

export default FormGrid;