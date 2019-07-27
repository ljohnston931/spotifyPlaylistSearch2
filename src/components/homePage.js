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
                <div className="heading">
                    <p className="title">DISCOVER YOUR SPOTIFY SOULMATE</p>
                    <p className="subtitle">FIND A SPOTIFY USER WHOSE TASTE IS AS GOOD AS YOURS.</p>
                </div>
                    <FormGrid setResults={this.setResults} />
                <Results results={this.state.results} />
          </div>
        )
  }
}

export default HomePage;