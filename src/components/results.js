import React, { Component } from 'react';
import Result from './result.js';

class Results extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.results) {
            // if (error) sorry I only get 100 searches a day before google starts charging me money. Try again tomorrow!
            const hitCountString = `${this.props.results.hitCount}` + ' results';
            const results = this.props.results.items.map(result =>
                <Result metadata={result} />);

        return (
            <div>
                <p>{hitCountString}</p>
                <div>{results}</div>
            </div>
        );} else {
            return (null);
        }
    }
}

export default Results;