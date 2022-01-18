import React, { Component } from 'react';
import ReactGA from 'react-ga';
import searchResultsService from '../controllers/searchResultsService'

class GetResultsButton extends Component {
    constructor(props) {
        super(props);
        this.showMore = this.showMore.bind(this)
    }

    async showMore() {
        const newResults = await searchResultsService.getMoreResults(this.props.nextPageUrl, this.props.baseUrl);
        if (!newResults.error) {
            this.props.addNewResults(newResults);
        }
    }
    render() {
        if (this.props.nextPageUrl) {
            return (
                <button className="pill" onClick={this.showMore}>More</button>
            );
        } else {
            return null;
        }
    }
}

export default GetResultsButton;