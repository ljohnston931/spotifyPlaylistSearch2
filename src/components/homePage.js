import React, { Component } from 'react';
import Results from './results.js';
import FormGrid from './formGrid.js';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setResults = this.setResults.bind(this);
    }

    setResults(results) {
        this.setState({ results: results });
    }

    render() {
        return (
            <div>
                <div className="searchSection">
                    <h1>Find your Spotify Soulmate:</h1>
                    <FormGrid setResults={this.setResults} />
                </div>
                <Results results={this.state.results} />
          </div>
        )
  }
}

export default HomePage;