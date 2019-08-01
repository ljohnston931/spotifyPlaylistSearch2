import React, { Component } from 'react';
import Result from './result.js';

class Results extends Component {

    render() {
        if (this.props.results) {
            // if (error) sorry I only get 100 searches a day before google starts charging me money. Try again tomorrow!
            const message = this.props.results.message;
            let results;
            if (this.props.results.items) {
                results = this.props.results.items.map((result, index) =>
                    <Result metadata={result} key={index} />);
            }

        return (
            <div>
                <p>{message}</p>
                <div>{results}</div>
            </div>
        );} else {
            return (null);
        }
    }
}

export default Results;